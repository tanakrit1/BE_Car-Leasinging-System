import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarInformation } from "src/database/entities/carinformation.entity";
import { CarInformationController } from "../controller/carInformation.controller";
import { CarInformationService } from "../service/carInformation.service";
import { CarInformationRepository } from "../repositories/carInformation.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CarInformation])],
    controllers: [CarInformationController],
    providers: [CarInformationService, CarInformationRepository],
    exports: [CarInformationService],
})
export class CarInformationModule { }