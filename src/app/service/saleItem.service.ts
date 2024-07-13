import { Injectable } from "@nestjs/common";
import { SaleItemRepository } from "../repositories/saleItem.repository";
import { SaleItemModel, SaleItemPaginationModel } from "../models/saleitem.model";
import { CreateSaleItemDto } from "../dto/saleitem/saleitem.dto";
import { plainToInstance } from "class-transformer";
import { CarInformationService } from "./carInformation.service";
import { CarInformationModel } from "../models/carInformation.model";

@Injectable()
export class SaleItemService {
    constructor(
        private readonly saleItemRepository: SaleItemRepository,
        private readonly carInformationService: CarInformationService

    ) { }

    async findById(id: number): Promise<SaleItemModel> {
        return await this.saleItemRepository.findById(id);
    }

    async search(dto): Promise<SaleItemPaginationModel> {
        const models = await this.saleItemRepository.search(dto);
        return models
    }

    async create(dto: CreateSaleItemDto): Promise<SaleItemModel> {
        let carInformationModel = new CarInformationModel();
        if (dto.carInformation_id) {
            carInformationModel = await this.carInformationService.findById(dto.carInformation_id)
        }
        const model: SaleItemModel = plainToInstance(SaleItemModel, {
            ...dto,
            carInformation: carInformationModel
        })
        return await this.saleItemRepository.save(model);
    }

    async update(dto: CreateSaleItemDto): Promise<SaleItemModel> {
        const model: SaleItemModel = plainToInstance(SaleItemModel, {
            ...dto,
        })
        return await this.saleItemRepository.save(model);
    }
}