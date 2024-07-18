import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "../service/payment.service";
import { PaymentPaginationVm, PaymentResponseVm } from "../view-model/payment/payment.vm";
import { CreatePaymentDto, SearchPaymentDto } from "../dto/payment/payment.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

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

}