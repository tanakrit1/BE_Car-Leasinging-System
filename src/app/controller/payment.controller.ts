import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PaymentService } from "../service/payment.service";
import { PaymentPaginationVm, PaymentResponseVm } from "../view-model/payment/payment.vm";
import { CreatePaymentDto, SearchPaymentDto } from "../dto/payment/payment.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { PaymentModel } from "../models/payment.model";

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @Post('search')
    async search(@Body() dto: SearchPaymentDto): Promise<PaymentPaginationVm> {
        try {
            const responses = await this.paymentService.search(dto)
            const pagination: PaginationMetadataModel = {
                page: dto.page,
                perPage: dto.limit,
                totalItems: responses.totalItems,
            };
            return PaymentPaginationVm.convertToViewModel(responses, pagination)
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }

    @Post()
    async create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseVm> {
        try {
            const created = await this.paymentService.create(dto);
            return PaymentResponseVm.convertToViewModel(created);
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }

    @Delete('/:id')
    async delete(@Param('id') parametersId: number): Promise<PaymentResponseVm> {
      try {
          const paymentId = Number(parametersId);
        const payment = await this.paymentService.findById(paymentId);
        if (!payment) {
          throw new NotFoundException(
            { field: 'id', value: parametersId },
            `ไม่พบข้อมูลของ paymentId ID ${parametersId}`,
          );
        }
        const deleted: PaymentModel = await this.paymentService.delete(payment);
        return PaymentResponseVm.convertToViewModel(deleted);
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Post('closeInstallment')
    async closeInstallment(@Body() dto: CreatePaymentDto): Promise<any> {
      try {
          const created = await this.paymentService.closeInstallment(dto);
          return PaymentResponseVm.convertToViewModel(created);
      } catch (err) {
          console.log(err)
          throw HandleErrorException(err);
      }
  }

  @Post('dashboardPastYear')
  async dashboardPastYear(@Body() dto: any): Promise<any> {
    try{
      const responses = await this.paymentService.dashboardPastYear(dto)
      return responses 

    }catch(err){
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post('dashboardPastMonth')
  async dashboardPastMonth(@Body() dto: any): Promise<any> {
    try{
      const responses = await this.paymentService.dashboardPastMonth(dto)
      return responses 
    }catch(err){
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post('dashboardPay')
  async dashboardPay(): Promise<any> {
    try{
      const responses = await this.paymentService.dashboardPay()
      return PaymentResponseVm.convertToViewModel(responses)  
    }catch(err){
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post('reportPayment')
  async reportPayment(@Body() dto: any): Promise<any> {
    try{
      const responses = await this.paymentService.reportPayment(dto)
      return responses
      // return PaymentResponseVm.convertToViewModel(responses)  
    }catch(err){
      console.log(err)
      throw HandleErrorException(err);
    }
  }


}