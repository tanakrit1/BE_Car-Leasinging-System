import { Type } from "class-transformer";
import { Payment } from "src/database/entities/payment.entity";

export class PaymentModel extends Payment { }

export class  PaymentPaginationModel {
    @Type(() => PaymentModel)
    payments: PaymentModel[];
    totalItems: number;
}