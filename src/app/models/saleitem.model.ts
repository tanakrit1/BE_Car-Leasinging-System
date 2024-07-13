import { Type } from "class-transformer";
import { SaleItem } from "src/database/entities/saleItem.entity";

export class SaleItemModel extends SaleItem { }

export class  SaleItemPaginationModel {
    @Type(() => SaleItemModel)
    saleItems: SaleItemModel[];
    totalItems: number;
}