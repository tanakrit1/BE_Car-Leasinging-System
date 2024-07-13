import { plainToInstance, Type } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { SaleItemModel, SaleItemPaginationModel } from "src/app/models/saleitem.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataModel } from "src/app/models/base.model";


export class SaleItemPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => SaleItemModel)
    data: SaleItemModel[];

    static convertToViewModel(
        pagination: SaleItemPaginationModel,
        metadata: PaginationMetadataModel,
    ): SaleItemPaginationVm {
        return plainToInstance(SaleItemPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.saleItems.map(
                (saleItem) => SaleItemResponseVm.convertToViewModel(saleItem).data,
            ),
        } as SaleItemPaginationVm);
    }
}



export class SaleItemResponseVm extends ResponseVm {
    @Type(() => SaleItemModel)
    data: SaleItemModel;
    static convertToViewModel(response: SaleItemModel): SaleItemResponseVm {
        try {
            return plainToInstance(SaleItemResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as SaleItemResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}