import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleItem } from "src/database/entities/saleItem.entity";
import { SaleItemController } from "../controller/saleItem.controller";
import { SaleItemService } from "../service/saleItem.service";
import { SaleItemRepository } from "../repositories/saleItem.repository";
import { CarInformationModule } from "./carInformation.module";
import { GuarantorModule } from "./guarantor.module";
import { PaymentModule } from "./payment.module";

@Module({
    imports: [TypeOrmModule.forFeature([SaleItem]),CarInformationModule, forwardRef(() =>GuarantorModule),forwardRef(() =>PaymentModule)],
    controllers: [SaleItemController],
    providers: [SaleItemService, SaleItemRepository],
    exports: [SaleItemService,SaleItemRepository],
})
export class SaleItemModule { }