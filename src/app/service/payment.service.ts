import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentModel, PaymentPaginationModel } from "../models/payment.model";
import { CreatePaymentDto } from "../dto/payment/payment.dto";
import { plainToInstance } from "class-transformer";
import { SaleItemModel } from "../models/saleitem.model";
import { SaleItemService } from "./saleItem.service";

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly saleItemService: SaleItemService
    ) { }

    async search(dto): Promise<PaymentPaginationModel> {
        const models = await this.paymentRepository.search(dto);
        return models
    }

    async create(dto: CreatePaymentDto): Promise<any> {
        let saleItemModel = new SaleItemModel();
        if (dto.saleItem_id) {
            saleItemModel = await this.saleItemService.findById(dto.saleItem_id)
            //เพิ่มคำนวนเเเละupdate saleItem
            console.log('saleItemModel',saleItemModel)
        }
        const model: PaymentModel = plainToInstance(PaymentModel, {
            ...dto,
            saleItem: saleItemModel
        }) 
        return await this.paymentRepository.save(model);
    }
}