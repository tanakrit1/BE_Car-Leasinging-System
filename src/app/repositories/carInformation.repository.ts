import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarInformation } from "src/database/entities/carinformation.entity";
import { Repository } from "typeorm";
import { CarInformationModel } from "../models/carInformation.model";

@Injectable()
export class CarInformationRepository {
    constructor(
        @InjectRepository(CarInformation)
        private readonly repository: Repository<CarInformation>
    ) { }

    async save(model: CarInformationModel): Promise<CarInformationModel> {
        try {
            const entity: CarInformationModel = this.repository.create(model);
            const saved: CarInformationModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}