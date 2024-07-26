import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarInformation } from "src/database/entities/carinformation.entity";
import { Repository } from "typeorm";
import { CarInformationModel, CarInformationPaginationModel } from "../models/carInformation.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";

@Injectable()
export class CarInformationRepository {
    constructor(
        @InjectRepository(CarInformation)
        private readonly repository: Repository<CarInformation>
    ) { }

    async findById(id: number): Promise<CarInformationModel> {
        try {
          const carInformation: CarInformationModel = await this.repository.findOne({
            where: { id: id },
          });
          return carInformation;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }

    async search(dto: any): Promise<CarInformationPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('carInformation')
            .select('carInformation')
            applyRepositorySortingModel(query, 'carInformation', dto);
            applyRepositoryQuickFilter(query, 'carInformation', dto.filterModel);
            applyRepositoryFilterModel(query, 'carInformation', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [CarInformations, count] = queryResult;
            return plainToInstance(CarInformationPaginationModel, {
                CarInformations: CarInformations,
                totalItems: count,
            } as CarInformationPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: CarInformationModel): Promise<CarInformationModel> {
        try {
            const entity: CarInformationModel = this.repository.create(model);
            const saved: CarInformationModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async delete(model: CarInformationModel): Promise<CarInformationModel> {
        try {
          const entity: CarInformationModel = this.repository.create(model);
          const deleted: CarInformationModel = await this.repository.softRemove(entity);
          return deleted;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
    }
         
    async stock(): Promise<any>{
      try{
          const dayjs = require('dayjs');
          const date = dayjs().format('YYYY-MM-DD');

          const querysold = this.repository.createQueryBuilder('carInformation')
          .select('carInformation')
          .where(
              'YEAR(carInformation.createdAt) = YEAR(:date)',
              { date }
          ).andWhere(
            'carInformation.carStatus = "sold" '
          )
          const queryResultsold = await querysold.getCount();

               
          const querystock = this.repository.createQueryBuilder('carInformation')
          .select('carInformation')
          .where(
              'YEAR(carInformation.createdAt) = YEAR(:date)',
              { date }
          ).andWhere(
            'carInformation.carStatus = "stock" '
          )
          const queryResulstock = await querystock.getCount();
          
          return {sold:queryResultsold||0,stock:queryResulstock||0}
      }catch(err){
          console.log(err)
          throw new InternalServerErrorException(err.message + err?.query);
      }
  }
}