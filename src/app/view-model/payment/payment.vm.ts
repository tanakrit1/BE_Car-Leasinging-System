import { plainToInstance, Type } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { PaymentModel, PaymentPaginationModel } from "src/app/models/payment.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataModel } from "src/app/models/base.model";

export class PaymentPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => PaymentModel)
    data: PaymentModel[];

    static convertToViewModel(
        pagination: PaymentPaginationModel,
        metadata: PaginationMetadataModel,
    ): PaymentPaginationVm {
        return plainToInstance(PaymentPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.payments.map(
                (payment) => PaymentResponseVm.convertToViewModel(payment).data,
            ),
        } as PaymentPaginationVm);
    }
}


export class PaymentResponseVm extends ResponseVm {
    @Type(() => PaymentModel)
    data: PaymentModel;
    static convertToViewModel(response: PaymentModel): PaymentResponseVm {
        try {
            return plainToInstance(PaymentResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as PaymentResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}