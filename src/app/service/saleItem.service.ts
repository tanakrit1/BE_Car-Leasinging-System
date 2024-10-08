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

    async findByIdDelete(id: number): Promise<SaleItemModel> {
        return await this.saleItemRepository.findByIdDelete(id);
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
                // carType: "pledge",
                carStatus: "sold"
            } as CarInformationModel)
            carInformationModel = await this.carInformationService.create(modelCarInformation)
        }

        const model: SaleItemModel = plainToInstance(SaleItemModel, {
            ...dto,
            contractDate: dto.contractDate,
            dueDate: dto.contractDate,
            remainingBalance: dto.totalOrder,
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

    async summarySalesPastYear(dto): Promise<any> {
        const saleItemYear = await this.saleItemRepository.summarySalesPastYear(dto);

        type SalesSummary = {
            [year: string]: {
                total: number;
                payment: number;
            };
        };

        function summarizeSales(data): SalesSummary {
            const summary: SalesSummary = {};

            data.forEach(sale => {
                const year = new Date(sale.createdAt).getFullYear().toString();
                const payment = parseFloat(sale.downPayment) + parseFloat(sale.totalOrder);

                if (!summary[year]) {
                    summary[year] = { total: 0, payment: 0 };
                }

                summary[year].total += 1;
                summary[year].payment += payment;
            });

            return summary;
        }

        const salesSummary = summarizeSales(saleItemYear.saleItems);

        return salesSummary
    }

    async summarySalesPastMonth(dto): Promise<any> {
        const saleItemMonth = await this.saleItemRepository.summarySalesPastMonth(dto);
        // return saleItemMonth
        type SalesSummary = {
            [year: string]: {
                total: number;
                payment: number;
            };
        };

        function summarizeSales(data): SalesSummary {
            const summary: SalesSummary = {};

            data.forEach(sale => {
                const year = new Date(sale.createdAt).getFullYear().toString();
                const payment = parseFloat(sale.downPayment) + parseFloat(sale.totalOrder);

                if (!summary[year]) {
                    summary[year] = { total: 0, payment: 0 };
                }

                summary[year].total += 1;
                summary[year].payment += payment;
            });

            return summary;
        }

        const salesSummary = summarizeSales(saleItemMonth.saleItems);

        return salesSummary
    }

    async maxid(): Promise<SaleItemModel> {
        const maxid = await this.saleItemRepository.maxid();
        return maxid
    }

    async summarySalesPast(): Promise<any> {
        // let saleYear = await this.summarySalesPastYear("")
        let saleMonth = await this.summarySalesPastMonth("")
        return {saleMonth: saleMonth}
    }


    async delete(
        models: SaleItemModel,
    ): Promise<SaleItemModel> {

        let carInformationModel = new CarInformationModel();
        let carInformation_id = models?.carInformation?.id
        let saleItem_saleType = models?.saleType
        let deleted = await this.saleItemRepository.delete(models);

        if(deleted){
            if (carInformation_id) {
                carInformationModel = await this.carInformationService.findById(carInformation_id)
                if (carInformationModel&&saleItem_saleType == 'buy') {
                    const updateCarInformationDto: CarInformationModel = plainToInstance(CarInformationModel, {
                        id:carInformationModel.id,
                        carStatus:'stock'
                    } as CarInformationModel)
                    carInformationModel = await this.carInformationService.update(updateCarInformationDto)
                }else if(carInformationModel&&saleItem_saleType == 'pledge'){

                    await this.carInformationService.delete(carInformationModel)
                }else{
                    await this.carInformationService.delete(carInformationModel)
                }
            }
        }
        return deleted
    }

}