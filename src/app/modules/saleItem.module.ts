import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleItem } from "src/database/entities/saleItem.entity";
import { SaleItemController } from "../controller/saleItem.controller";
import { SaleItemService } from "../service/saleItem.service";
import { SaleItemRepository } from "../repositories/saleItem.repository";
import { CarInformationModule } from "./carInformation.module";

@Module({
    imports: [TypeOrmModule.forFeature([SaleItem]),CarInformationModule],
    controllers: [SaleItemController],
    providers: [SaleItemService, SaleItemRepository],
    exports: [SaleItemService],
})
export class SaleItemModule { }