import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "src/database/entities/payment.entity";
import { PaymentController } from "../controller/payment.controller";
import { PaymentService } from "../service/payment.service";
import { PaymentRepository } from "../repositories/payment.repository";
import { SaleItemModule } from "./saleItem.module";

@Module({
    imports: [TypeOrmModule.forFeature([Payment]),SaleItemModule],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository],
    exports: [PaymentService],
})
export class PaymentModule { }