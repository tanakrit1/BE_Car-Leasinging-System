import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guarantor } from "src/database/entities/guarantor.entity";
import { Repository } from "typeorm";
import { GuarantorModel, GuarantorPaginationModel } from "../models/guarantor.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class GuarantorRepository {
    constructor(
        @InjectRepository(Guarantor)
        private readonly repository: Repository<Guarantor>
    ) { }

    async search(dto: any): Promise<GuarantorPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('guarantor')
            .select('guarantor')
            .leftJoinAndSelect('guarantor.saleItem', 'saleItem')
            applyRepositorySortingModel(query, 'guarantor', dto);
            applyRepositoryQuickFilter(query, 'guarantor', dto.filterModel);
            applyRepositoryFilterModel(query, 'guarantor', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [guarantors, count] = queryResult;
            return plainToInstance(GuarantorPaginationModel, {
                guarantors: guarantors,
                totalItems: count,
            } as GuarantorPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: GuarantorModel): Promise<GuarantorModel> {
        try {
            const entity: GuarantorModel = this.repository.create(model);
            const saved: GuarantorModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}


