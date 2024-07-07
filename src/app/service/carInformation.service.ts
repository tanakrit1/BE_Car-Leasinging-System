import { Injectable } from "@nestjs/common";
import { CarInformationRepository } from "../repositories/carInformation.repository";
import { CarInformationModel } from "../models/carInformation.model";
import { plainToInstance } from "class-transformer";
import { CreateCarInformationDto } from "../dto/carInformation/carInformation.dto";

@Injectable()
export class CarInformationService {
    constructor(
        private readonly carInformationRepository: CarInformationRepository
    ) { }

    async create(dto: CreateCarInformationDto): Promise<CarInformationModel> {
        const model: CarInformationModel = plainToInstance(CarInformationModel, dto as CarInformationModel)
        return await this.carInformationRepository.save(model);
    }
}