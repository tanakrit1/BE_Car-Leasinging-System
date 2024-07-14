import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Guarantor } from "src/database/entities/guarantor.entity";
import { GuarantorController } from "../controller/guarantor.controller";
import { GuarantorService } from "../service/guarantor.service";
import { GuarantorRepository } from "../repositories/guarantor.repository";
import { SaleItemModule } from "./saleItem.module";

@Module({
    imports: [TypeOrmModule.forFeature([Guarantor]),forwardRef(() =>SaleItemModule) ],
    controllers: [GuarantorController],
    providers: [GuarantorService, GuarantorRepository],
    exports: [GuarantorService],
})
export class GuarantorModule { }