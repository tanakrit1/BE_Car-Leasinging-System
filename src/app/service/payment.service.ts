import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentModel, PaymentPaginationModel } from "../models/payment.model";
import { CreatePaymentDto, SearchPaymentDto } from "../dto/payment/payment.dto";
import { plainToInstance } from "class-transformer";
import { SaleItemModel } from "../models/saleitem.model";
import { SaleItemService } from "./saleItem.service";
import { FilterModelLogicOperatorEnum } from "src/enum/filter-model-logic-operator.enum";
import { FilterModelItemOperationEnum } from "src/enum/filter-model-item-operation.enum";
import { sumBy } from "lodash";
const dayjs = require('dayjs');

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

    async findIdSaleitem(id: number): Promise<PaymentModel> {
        return await this.paymentRepository.findIdSaleitem(id);
    }

    async create(dto: CreatePaymentDto): Promise<any> {
        let saleItemModel = new SaleItemModel();
        let saleItemUpdate
        if (dto.saleItem_id) {
            saleItemModel = await this.saleItemService.findById(dto.saleItem_id)
            //เพิ่มคำนวนเเเละupdate saleItem
            saleItemUpdate = {
                id: saleItemModel.id,
                dueDate: dayjs().add(1, 'month').format('YYYY-MM-DD'), //วันนัดชำระ
                paymentAmount: Number(saleItemModel.paymentAmount || 0) + Number(dto.amountPay || 0), //จำนวนเงินที่ชำระแล้ว ,
                remainingBalance: Number(saleItemModel.remainingBalance || 0) - Number(dto.amountPay || 0), //ยอดเงินคงเหลือ
                totalInterest: Number(saleItemModel.totalInterest || 0) + Number(dto.InterestPay || 0), //ดอกเบี้ยที่ได้รับรวม
                totalFee: Number(saleItemModel.totalFee || 0) + Number(dto.fee || 0)   // เพิ่ม รวมค่าปรับ
            }
        }
        const model: PaymentModel = plainToInstance(PaymentModel, {
            ...dto,
            datePay: dayjs().add(1, 'month').format('YYYY-MM-DD'),
            saleItem: saleItemModel
        })
        const createdPayment = await this.paymentRepository.save(model);

        const updateSaleItemDto: SaleItemModel = plainToInstance(SaleItemModel, saleItemUpdate as SaleItemModel)
        const updatedSaleItem = await this.saleItemService.update(updateSaleItemDto);

        return { ...createdPayment, saleItem: updatedSaleItem }
    }

    async delete(model: PaymentModel): Promise<PaymentModel> {
        let findIdSaleitem = await this.findIdSaleitem(model.id)

        const deletePayment = await this.paymentRepository.delete(model);

        let serachPaymentRequestVm: SearchPaymentDto = {
            page: 1,
            limit: 1000,
            sortField: 'id',
            sortType: 'DESC',
            filterModel: {
                logicOperator: FilterModelLogicOperatorEnum.AND,
                items: [
                    {
                        field: 'saleItem_id',
                        operator: FilterModelItemOperationEnum.EQUALS,
                        value: findIdSaleitem.saleItem.id,
                    },
                ],
            },
        } as SearchPaymentDto;
        const PaymentSearch = await this.paymentRepository.search(serachPaymentRequestVm);

        let saleItemModel = PaymentSearch.payments[0]?.saleItem || findIdSaleitem.saleItem
        let saleItemUpdate
        saleItemUpdate = {
            id: saleItemModel.id,
            dueDate: PaymentSearch.totalItems > 0 ? PaymentSearch.payments[0].datePay : undefined, //วันนัดชำระ
            paymentAmount: Number(saleItemModel.paymentAmount || 0) - Number(deletePayment.amountPay || 0), //จำนวนเงินที่ชำระแล้ว ,
            remainingBalance: Number(saleItemModel.remainingBalance || 0) + Number(deletePayment.amountPay || 0), //ยอดเงินคงเหลือ
            totalInterest: Number(saleItemModel.totalInterest || 0) - Number(deletePayment.InterestPay || 0), //ดอกเบี้ยที่ได้รับรวม
            totalFee: Number(saleItemModel.totalFee || 0) + Number(deletePayment.fee || 0)   // เพิ่ม รวมค่าปรับ
        }
        const updateSaleItemDto: SaleItemModel = plainToInstance(SaleItemModel, saleItemUpdate as SaleItemModel)
        const updatedSaleItem = await this.saleItemService.update(updateSaleItemDto);
        return { ...deletePayment, saleItem: updatedSaleItem }

        // let sumPayment
        //   if(PaymentSearch.totalItems>1){

        //     sumPayment ={
        //         datePay:PaymentSearch.payments[0].datePay,
        //         amountPay: sumBy(PaymentSearch.payments,(payment) => Number(payment.amountPay)|| 0),
        //         InterestPay: sumBy(PaymentSearch.payments,(payment) => Number(payment.InterestPay)|| 0),
        //         fee: sumBy(PaymentSearch.payments,(payment) => Number(payment.fee)|| 0),
        //       }
        //       console.log('sumPayment',sumPayment)
        //   }else{
        //     let saleItemModel =PaymentSearch.payments[0].saleItem
        //     sumPayment ={
        //         amountPay: saleItemModel.paymentAmount - deletePayment.amountPay ,
        //         InterestPay: saleItemModel.remainingBalance + deletePayment.amountPay ,
        //         fee: saleItemModel.totalInterest -deletePayment.InterestPay ,
        //       }
        //   }
    }

    async closeInstallment(dto): Promise<any> {
        let saleItemModel = new SaleItemModel();
        let saleItemUpdate
        if (dto.saleItem_id) {
            saleItemModel = await this.saleItemService.findById(dto.saleItem_id)
            //เพิ่มคำนวนเเเละupdate saleItem
            saleItemUpdate = {
                id: saleItemModel.id,
                dueDate: dayjs().format('YYYY-MM-DD'), //วันนัดชำระ
                paymentAmount: Number(saleItemModel.paymentAmount || 0) + Number(dto.amountPay || 0), //จำนวนเงินที่ชำระแล้ว ,
                remainingBalance: Number(saleItemModel.remainingBalance || 0) - Number(dto.amountPay || 0), //ยอดเงินคงเหลือ
                totalInterest: Number(saleItemModel.totalInterest || 0) + Number(dto.InterestPay || 0), //ดอกเบี้ยที่ได้รับรวม
                totalFee: Number(saleItemModel.totalFee || 0) + Number(dto.fee || 0),   // เพิ่ม รวมค่าปรับ

                discount: Number(saleItemModel.discount || 0) + Number(dto.discount || 0),
                statusInstallment: "Close"
            }
        }
        const model: PaymentModel = plainToInstance(PaymentModel, {
            ...dto,
            datePay: dayjs().format('YYYY-MM-DD'),
            saleItem: saleItemModel
        })
        const createdPayment = await this.paymentRepository.save(model);

        const updateSaleItemDto: SaleItemModel = plainToInstance(SaleItemModel, saleItemUpdate as SaleItemModel)
        const updatedSaleItem = await this.saleItemService.update(updateSaleItemDto);

        return { ...createdPayment, saleItem: updatedSaleItem }
    }

    async dashboardPastYear(dto) {
        const paymentYear = await this.paymentRepository.dashboardPastYear(dto);
        type PaymentSummary = {
            [year: string]: {
                totalPayment: number;
            };
        };

        function summarizeSales(data): PaymentSummary {
            const payment: PaymentSummary = {};

            data.forEach(pay => {
                const year = new Date(pay.createdAt).getFullYear().toString();
                const totalPayment = parseFloat(pay.InterestPay) + parseFloat(pay.amountPay);

                if (!payment[year]) {
                    payment[year] = { totalPayment: 0 };
                }
                payment[year].totalPayment += totalPayment;
            });

            return payment;
        }

        const paymentSummary = summarizeSales(paymentYear.payments);

        return paymentSummary
    }

    async dashboardPastMonth(dto):Promise<any>{
        const paymentMounth = await this.paymentRepository.dashboardPastMonth(dto);

        type PaymentSummary = {
            [year: string]: {
                totalPayment: number;
            };
        };

        function summarizeSales(data): PaymentSummary {
            const payment: PaymentSummary = {};
        
            data.forEach(pay => {
                const date = new Date(pay.createdAt);
                const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                const totalPayment = parseFloat(pay.InterestPay) + parseFloat(pay.amountPay);
        
                if (!payment[yearMonth]) {
                    payment[yearMonth] = { totalPayment: 0 };
                }
                payment[yearMonth].totalPayment += totalPayment;
            });
        
            return payment;
        }
        
        const paymentSummary = summarizeSales(paymentMounth.payments);

        return paymentSummary

    }

    async dashboardPay():Promise<any>{
        let  paymentYear =  await this.dashboardPastYear("")
        let  paymentMonth =  await this.dashboardPastMonth("")
        return {paymentYear:paymentYear,paymentMonth:paymentMonth}
    }

}