import { Body, Controller, Post } from "@nestjs/common";
import { SaleItemService } from "../service/saleItem.service";
import { CreateSaleItemDto, SearchSaleItemDto } from "../dto/saleitem/saleitem.dto";
import { SaleItemPaginationVm, SaleItemResponseVm } from "../view-model/saleitem/saleitem.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

@Controller('saleitem')
export class SaleItemController {
    constructor(
        private readonly saleItemService: SaleItemService
    ) { }

    @Post('search')
    async search(@Body() dto: SearchSaleItemDto): Promise<SaleItemPaginationVm> {
        try {
            const responses = await this.saleItemService.search(dto)
            const pagination: PaginationMetadataModel = {
                page: dto.page,
                perPage: dto.limit,
                totalItems: responses.totalItems,
            };
            return SaleItemPaginationVm.convertToViewModel(responses, pagination)
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }

    @Post()
    async create(@Body() dto: CreateSaleItemDto): Promise<SaleItemResponseVm> {
      try {
        const created = await this.saleItemService.create(dto);
        return SaleItemResponseVm.convertToViewModel(created);
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }

}