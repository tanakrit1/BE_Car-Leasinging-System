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

    async findById(id: number): Promise<PaymentModel> {
        return await this.paymentRepository.findById(id);
    }


    async create(dto: CreatePaymentDto): Promise<any> {
        let saleItemModel = new SaleItemModel();
        let saleItemUpdate 
        if (dto.saleItem_id) {
            saleItemModel = await this.saleItemService.findById(dto.saleItem_id)
            //เพิ่มคำนวนเเเละupdate saleItem
             saleItemUpdate ={
                id:saleItemModel.id,
                dueDate:dto.datePay, //วันนัดชำระ
                paymentAmount:Number(saleItemModel.paymentAmount||0) + Number(dto.amountPay||0), //จำนวนเงินที่ชำระแล้ว ,
                remainingBalance:Number(saleItemModel.remainingBalance||0) - Number(dto.amountPay||0), //ยอดเงินคงเหลือ
                totalInterest:Number(saleItemModel.totalInterest||0) + Number(dto.InterestPay||0), //ดอกเบี้ยที่ได้รับรวม
                totalFee:Number(saleItemModel.totalFee||0)+Number(dto.fee||0)   // เพิ่ม รวมค่าปรับ
            }
        }
        const model: PaymentModel = plainToInstance(PaymentModel, {
            ...dto,
            saleItem: saleItemModel
        }) 
        const createdPayment = await this.paymentRepository.save(model);

        const updateSaleItemDto: SaleItemModel = plainToInstance(SaleItemModel, saleItemUpdate as SaleItemModel)
        const updatedSaleItem = await this.saleItemService.update(updateSaleItemDto);

        return {...createdPayment,saleItem:updatedSaleItem}
    }

    async delete(model: PaymentModel): Promise<PaymentModel> {
        return await this.paymentRepository.delete(model);
    }

    
}