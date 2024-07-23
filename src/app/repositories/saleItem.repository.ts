import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleItem } from "src/database/entities/saleItem.entity";
import { Repository } from "typeorm";
import { SaleItemModel, SaleItemPaginationModel } from "../models/saleitem.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";

@Injectable()
export class SaleItemRepository {
    constructor(
        @InjectRepository(SaleItem)
        private readonly repository: Repository<SaleItem>
    ) { }

    async findById(id: number): Promise<SaleItemModel> {
        try {
          const carInformation: SaleItemModel = await this.repository.findOne({
            where: { id: id },
          });
          return carInformation;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }

    async search(dto: any): Promise<SaleItemPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('saleitem')
            .select('saleitem')
            .leftJoinAndSelect('saleitem.guarantors', 'guarantor')
            .leftJoinAndSelect('saleitem.carInformation', 'carInformation')
            .leftJoinAndSelect('saleitem.payments', 'payment')
            applyRepositorySortingModel(query, 'saleitem', dto);
            applyRepositoryQuickFilter(query, 'saleitem', dto.filterModel);
            applyRepositoryFilterModel(query, 'saleitem', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [saleItems, count] = queryResult;
            return plainToInstance(SaleItemPaginationModel, {
                saleItems: saleItems,
                totalItems: count,
            } as SaleItemPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: SaleItemModel): Promise<SaleItemModel> {
        try {
            const entity: SaleItemModel = this.repository.create(model);
            const saved: SaleItemModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
    async  summarySalesPastYear(dto): Promise<any>{
        try{
            const dateStart = dto.dateStart;
            const dateEnd = dto.dateEnd;
            const query = this.repository.createQueryBuilder('saleitem')
            .select('saleitem')
            .where(
                'YEAR(saleitem.createdAt) BETWEEN YEAR(:dateStart) AND YEAR(:dateEnd)',
                { dateStart, dateEnd }
            );
            applyRepositorySortingModel(query, 'saleitem', dto);
            applyRepositoryQuickFilter(query, 'saleitem', dto.filterModel);
            applyRepositoryFilterModel(query, 'saleitem', dto.filterModel);
            // query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [saleItems, count] = queryResult;
            return plainToInstance(SaleItemPaginationModel, {
                saleItems: saleItems,
                totalItems: count,
            } as SaleItemPaginationModel);
        }catch(err){
            throw new InternalServerErrorException(err.message + err?.query);
        }

    }
}