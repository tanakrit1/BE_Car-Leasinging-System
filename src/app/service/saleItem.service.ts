import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { SaleItemRepository } from "../repositories/saleItem.repository";
import { SaleItemModel, SaleItemPaginationModel } from "../models/saleitem.model";
import { CreateAdvanceSaleItemDto, CreateSaleItemDto, UpdateAdvanceSaleItemDto } from "../dto/saleitem/saleitem.dto";
import { plainToInstance } from "class-transformer";
import { CarInformationService } from "./carInformation.service";
import { CarInformationModel } from "../models/carInformation.model";
import { GuarantorService } from "./guarantor.service";
import { GuarantorModel } from "../models/guarantor.model";
import { CreateGuarantorDto } from "../dto/guarantor/guarantor.dto";

@Injectable()
export class SaleItemService {
    constructor(
        private readonly saleItemRepository: SaleItemRepository,
        private readonly carInformationService: CarInformationService,
        @Inject(forwardRef(() => GuarantorService))
        private readonly guarantorService: GuarantorService

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

    async createAdvance(dto: CreateAdvanceSaleItemDto): Promise<any> {

        let carInformationModel = new CarInformationModel();
        if (dto.carInformation_id) {
            carInformationModel = await this.carInformationService.findById(dto.carInformation_id)

            const updateCarInformationDto: CarInformationModel = plainToInstance(CarInformationModel, {
                ...carInformationModel,
                ...dto,
                carStatus: "sold"
            } as CarInformationModel)
            carInformationModel = await this.carInformationService.update(updateCarInformationDto)

        } else {
            const modelCarInformation: CarInformationModel = plainToInstance(CarInformationModel, {
                ...dto,
                carType: "pledge",
                carStatus: "sold"
            } as CarInformationModel)
            carInformationModel = await this.carInformationService.create(modelCarInformation)
        }

        const model: SaleItemModel = plainToInstance(SaleItemModel, {
            ...dto,
            carInformation: carInformationModel
        })
        const createsaleItem = await this.saleItemRepository.save(model);

        let guarantorModel = []
        if (createsaleItem) {
            let saveGuarantor = dto.guarantors?.map(guarantor => {
                return { ...guarantor, saleItem: { id: createsaleItem.id } };
            });
            guarantorModel = await this.guarantorService.saveMany(saveGuarantor);
        }

        return { ...createsaleItem, carInformation: carInformationModel, guarantors: guarantorModel }
    }


    async updateAdvance(dto: UpdateAdvanceSaleItemDto): Promise<any> {

        let carInformationModel = new CarInformationModel();
        if (dto.carInformation_id) {
            carInformationModel = await this.carInformationService.findById(dto.carInformation_id)
            if (carInformationModel) {
                const updateCarInformationDto: CarInformationModel = plainToInstance(CarInformationModel, {
                    ...carInformationModel,
                    ...dto
                } as CarInformationModel)
                carInformationModel = await this.carInformationService.update(updateCarInformationDto)
            }
        }

        const model: SaleItemModel = plainToInstance(SaleItemModel, {
            ...dto,
            id: dto.saleitem_id
        })
        const updatesaleItem = await this.saleItemRepository.save(model);

        let guarantorModel = []
        if (dto.guarantors?.length > 0) {
            let saveGuarantor = dto.guarantors
            guarantorModel = await this.guarantorService.saveMany(saveGuarantor);
        }

        return { ...updatesaleItem, carInformation: carInformationModel, guarantors: guarantorModel }
    }

}