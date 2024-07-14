import { Injectable } from "@nestjs/common";
import { GuarantorRepository } from "../repositories/guarantor.repository";
import { GuarantorModel, GuarantorPaginationModel } from "../models/guarantor.model";
import { CreateGuarantorDto } from "../dto/guarantor/guarantor.dto";
import { plainToInstance } from "class-transformer";
import { SaleItemModel } from "../models/saleitem.model";
import { SaleItemService } from "./saleItem.service";

@Injectable()
export class GuarantorService {
    constructor(
        private readonly guarantorRepository: GuarantorRepository,
        private readonly saleItemService: SaleItemService
    ) { }

    async findById(id: number): Promise<GuarantorModel> {
        return await this.guarantorRepository.findById(id);
    }
    async search(dto): Promise<GuarantorPaginationModel> {
        const models = await this.guarantorRepository.search(dto);
        return models
    }

    async create(dto: CreateGuarantorDto): Promise<GuarantorModel> {
        let saleItemModel = new SaleItemModel();
        if (dto.saleItem_id) {
            saleItemModel = await this.saleItemService.findById(dto.saleItem_id)
        }
        const model: GuarantorModel = plainToInstance(GuarantorModel, {
            ...dto,
            saleItem: saleItemModel
        })
        return await this.guarantorRepository.save(model);
    }

    async update(dto: CreateGuarantorDto): Promise<GuarantorModel> {
        const model: GuarantorModel = plainToInstance(GuarantorModel, {
            ...dto,
        })
        return await this.guarantorRepository.save(model);
    }

    async delete(model: GuarantorModel): Promise<GuarantorModel> {
        return await this.guarantorRepository.delete(model);
    }
}