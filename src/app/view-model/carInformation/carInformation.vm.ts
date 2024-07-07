import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { ResponseVm } from "../base/base.vm";
import { CarInformationModel } from "src/app/models/carInformation.model";
import { plainToInstance, Type } from "class-transformer";

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