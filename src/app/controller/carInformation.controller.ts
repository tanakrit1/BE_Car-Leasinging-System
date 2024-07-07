import { Body, Controller, Post } from "@nestjs/common";
import { CarInformationService } from "../service/carInformation.service";
import { CarInformationResponseVm } from "../view-model/carInformation/carInformation.vm";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { CreateCarInformationDto } from "../dto/carInformation/carInformation.dto";

@Controller('carInformation')
export class CarInformationController {
  constructor(
    private readonly carInformationService: CarInformationService
  ) { }

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

}