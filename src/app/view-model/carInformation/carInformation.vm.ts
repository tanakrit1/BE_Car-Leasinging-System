import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { CarInformationModel, CarInformationPaginationModel } from "src/app/models/carInformation.model";
import { plainToInstance, Type } from "class-transformer";
import { PaginationMetadataModel } from "src/app/models/base.model";


export class CarInformationPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => CarInformationModel)
    data: CarInformationModel[];

    static convertToViewModel(
        pagination: CarInformationPaginationModel,
        metadata: PaginationMetadataModel,
    ): CarInformationPaginationVm {
        return plainToInstance(CarInformationPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.CarInformations.map(
                (CarInformation) => CarInformationResponseVm.convertToViewModel(CarInformation).data,
            ),
        } as CarInformationPaginationVm);
    }
}

export class CarInformationResponseVm extends ResponseVm {
    @Type(() => CarInformationModel)
    data: CarInformationModel;
    static convertToViewModel(response: CarInformationModel): CarInformationResponseVm {
        try {
            return plainToInstance(CarInformationResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as CarInformationResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}