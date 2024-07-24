import { Body, Controller, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { SaleItemService } from "../service/saleItem.service";
import { CreateAdvanceSaleItemDto, CreateSaleItemDto, SearchSaleItemDto, UpdateAdvanceSaleItemDto, UpdateSaleItemDto } from "../dto/saleitem/saleitem.dto";
import { SaleItemPaginationVm, SaleItemResponseVm } from "../view-model/saleitem/saleitem.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";
import { SaleItemModel } from "../models/saleitem.model";

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

    @Patch('/:id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateSaleItemDto,
    ): Promise<SaleItemResponseVm> {
      try {
        const SaleItem = await this.saleItemService.findById(id);
        if (!SaleItem) {
          throw new NotFoundException(`ไม่พบ SaleItem ${id}`);
        }
        const updateDto: SaleItemModel = plainToInstance(SaleItemModel, {
          ...SaleItem,
          ...dto
        } as SaleItemModel)
        const updated = await this.saleItemService.update(updateDto);
        return SaleItemResponseVm.convertToViewModel(updated);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }

    @Post('createAdvance')
    async createAdvance(@Body() dto: CreateAdvanceSaleItemDto): Promise<any> {
      try{
        const createdAdvance = await this.saleItemService.createAdvance(dto);
        return SaleItemResponseVm.convertToViewModel(createdAdvance);
      }catch(err){
        throw HandleErrorException(err);
      }
    }

    @Post('updateAdvance')
    async updateAdvance(@Body() dto: UpdateAdvanceSaleItemDto): Promise<any> {
      try{
        const updateAdvance = await this.saleItemService.updateAdvance(dto);
        return SaleItemResponseVm.convertToViewModel(updateAdvance);
      }catch(err){
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Post('summarySalesPastYear')
    async summarySalesPastYear(@Body() dto: any): Promise<any> {
      try{
        const responses = await this.saleItemService.summarySalesPastYear(dto)
        return responses 

      }catch(err){
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Post('summarySalesPastMonth')
    async summarySalesPastMonth(@Body() dto: any): Promise<any> {
      try{
        const responses = await this.saleItemService.summarySalesPastMonth(dto)
        return responses 
      }catch(err){
        console.log(err)
        throw HandleErrorException(err);
      }
    }


}