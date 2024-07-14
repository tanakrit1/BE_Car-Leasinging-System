import { Body, Controller, Delete, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GuarantorService } from "../service/guarantor.service";
import { CreateGuarantorDto, SearchGuarantorDto, UpdateGuarantorDto } from "../dto/guarantor/guarantor.dto";
import { GuarantorPaginationVm, GuarantorResponseVm } from "../view-model/guarantor/guarantor.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { GuarantorModel } from "../models/guarantor.model";
import { plainToInstance } from "class-transformer";

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

    @Patch('/:id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateGuarantorDto,
    ): Promise<GuarantorResponseVm> {
      try {
        const guarantor = await this.guarantorService.findById(id);
        if (!guarantor) {
          throw new NotFoundException(`ไม่พบ guarantor ${id}`);
        }
        const updateDto: GuarantorModel = plainToInstance(GuarantorModel, {
          ...guarantor,
          ...dto
        } as GuarantorModel)
        const updated = await this.guarantorService.update(updateDto);
        return GuarantorResponseVm.convertToViewModel(updated);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }

    @Delete('/:id')
    async delete( @Param('id', ParseIntPipe) id: number,): Promise<GuarantorResponseVm> {
      try {
        const guarantor = await this.guarantorService.findById(id);
        if (!guarantor) {
          throw new NotFoundException(`ไม่พบ guarantor ${id}`);
        }
        const deleted: GuarantorModel = await this.guarantorService.delete(guarantor);
        return GuarantorResponseVm.convertToViewModel(deleted);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }


}