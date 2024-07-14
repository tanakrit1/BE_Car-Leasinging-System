import { Body, Controller, Post } from "@nestjs/common";
import { GuarantorService } from "../service/guarantor.service";
import { CreateGuarantorDto, SearchGuarantorDto } from "../dto/guarantor/guarantor.dto";
import { GuarantorPaginationVm, GuarantorResponseVm } from "../view-model/guarantor/guarantor.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

@Controller('guarantor')
export class GuarantorController {
    constructor(
        private readonly guarantorService: GuarantorService
    ) { }

    @Post('search')
    async search(@Body() dto: SearchGuarantorDto): Promise<GuarantorPaginationVm> {
        try {
            const responses = await this.guarantorService.search(dto)
            const pagination: PaginationMetadataModel = {
                page: dto.page,
                perPage: dto.limit,
                totalItems: responses.totalItems,
            };
            return GuarantorPaginationVm.convertToViewModel(responses, pagination)
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }

    @Post()
    async create(@Body() dto: CreateGuarantorDto): Promise<GuarantorResponseVm> {
      try {
        const created = await this.guarantorService.create(dto);
        return GuarantorResponseVm.convertToViewModel(created);
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }
}