import { Type } from "class-transformer";
import { CarInformation } from "src/database/entities/carinformation.entity";

export class CarInformationModel extends CarInformation { }

export class  CarInformationPaginationModel {
    @Type(() => CarInformationModel)
    CarInformations: CarInformationModel[];
    totalItems: number;
}