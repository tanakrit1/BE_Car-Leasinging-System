import { Type } from "class-transformer";
import { Guarantor } from "src/database/entities/guarantor.entity";

export class GuarantorModel extends Guarantor { }

export class GuarantorPaginationModel {
    @Type(() => GuarantorModel)
    guarantors: GuarantorModel[];
    totalItems: number;
}