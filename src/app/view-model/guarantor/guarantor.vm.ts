import { plainToInstance, Type } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { GuarantorModel, GuarantorPaginationModel } from "src/app/models/guarantor.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataModel } from "src/app/models/base.model";

export class GuarantorPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => GuarantorModel)
    data: GuarantorModel[];

    static convertToViewModel(
        pagination: GuarantorPaginationModel,
        metadata: PaginationMetadataModel,
    ): GuarantorPaginationVm {
        return plainToInstance(GuarantorPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.guarantors.map(
                (guarantor) => GuarantorResponseVm.convertToViewModel(guarantor).data,
            ),
        } as GuarantorPaginationVm);
    }
}

export class GuarantorResponseVm extends ResponseVm {
    @Type(() => GuarantorModel)
    data: GuarantorModel;
    static convertToViewModel(response: GuarantorModel): GuarantorResponseVm {
        try {
            return plainToInstance(GuarantorResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as GuarantorResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}