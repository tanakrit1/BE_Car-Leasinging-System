import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CarInformationService } from "../service/carInformation.service";
import { CarInformationPaginationVm, CarInformationResponseVm } from "../view-model/carInformation/carInformation.vm";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { CreateCarInformationDto, SearchCarInformationDto, UpdateInformationDto } from "../dto/carInformation/carInformation.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { NotFoundException } from "../exceptions/not-found.exception";
import { CarInformationModel } from "../models/carInformation.model";
import { plainToInstance } from "class-transformer";

@Controller('carInformation')
export class CarInformationController {
  constructor(
    private readonly carInformationService: CarInformationService
  ) { }

  @Post('search')
  async search(@Body() dto: SearchCarInformationDto): Promise<CarInformationPaginationVm> {
    try {
      const responses = await this.carInformationService.search(dto)
      const pagination: PaginationMetadataModel = {
        page: dto.page,
        perPage: dto.limit,
        totalItems: responses.totalItems,
      };
      return CarInformationPaginationVm.convertToViewModel(responses, pagination)
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post()
  async create(@Body() dto: CreateCarInformationDto): Promise<CarInformationResponseVm> {
    try {
      const created = await this.carInformationService.create(dto);
      return CarInformationResponseVm.convertToViewModel(created);
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }


  @Patch('/:id')
  async update(
    @Param('id') parametersId: number,
    @Body() dto: UpdateInformationDto,
  ): Promise<CarInformationResponseVm> {
    try {
      const carInformation = await this.carInformationService.findById(parametersId)
      if (!carInformation) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ carInformation ID ${parametersId}`,
        );
      }
      const updateDto: CarInformationModel = plainToInstance(CarInformationModel, {
        ...carInformation,
        ...dto
      } as CarInformationModel)
      const updated: CarInformationModel = await this.carInformationService.update(updateDto);
      return CarInformationResponseVm.convertToViewModel(updated)
    } catch (err) {
      throw HandleErrorException(err)

    }
  }

  @Delete('/:id')
  async delete(@Param('id') parametersId: number): Promise<CarInformationResponseVm> {
    try {
      const carInformation = await this.carInformationService.findById(parametersId)
      if (!carInformation) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ carInformation ID ${parametersId}`,
        );
      }
      const deleted: CarInformationModel = await this.carInformationService.delete(carInformation)
      return CarInformationResponseVm.convertToViewModel(deleted);
    }
    catch (err) {
      throw HandleErrorException(err);
    }
  }
  
  @Get('stock')
  async stock(): Promise<CarInformationResponseVm> {
    try{
      const responses = await this.carInformationService.stock()
      return CarInformationResponseVm.convertToViewModel(responses)  
    }catch(err){
      console.log(err)
      throw HandleErrorException(err);
    }
  }

}