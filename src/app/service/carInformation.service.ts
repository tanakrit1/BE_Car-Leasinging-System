import { Injectable } from "@nestjs/common";
import { CarInformationRepository } from "../repositories/carInformation.repository";
import { CarInformationModel, CarInformationPaginationModel } from "../models/carInformation.model";
import { plainToInstance } from "class-transformer";
import { CreateCarInformationDto, UpdateInformationDto } from "../dto/carInformation/carInformation.dto";

@Injectable()
export class CarInformationService {
    constructor(
        private readonly carInformationRepository: CarInformationRepository
    ) { }

    async findById(id: number): Promise<CarInformationModel> {
        return await this.carInformationRepository.findById(id);
      }

    async search(dto): Promise<CarInformationPaginationModel> {
        const models = await this.carInformationRepository.search(dto);
        return models
      }

    async create(dto: CreateCarInformationDto): Promise<CarInformationModel> {
        const model: CarInformationModel = plainToInstance(CarInformationModel, dto as CarInformationModel)
        return await this.carInformationRepository.save(model);
    }

    async update(dto: UpdateInformationDto): Promise<CarInformationModel> {
      const model: CarInformationModel = plainToInstance(CarInformationModel, {
        ...dto,
      })
      return await this.carInformationRepository.save(model);
    }

    async delete(model: CarInformationModel): Promise<CarInformationModel> {
      return await this.carInformationRepository.delete(model);
  }
}