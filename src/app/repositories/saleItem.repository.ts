import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleItem } from "src/database/entities/saleItem.entity";
import { Repository } from "typeorm";
import { SaleItemModel, SaleItemPaginationModel } from "../models/saleitem.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { GuarantorRepository } from "./guarantor.repository";
import { PaymentRepository } from "./payment.repository";


@Injectable()
export class SaleItemRepository {
    constructor(
        @InjectRepository(SaleItem)
        private readonly repository: Repository<SaleItem>,
        private readonly guarantorRepository: GuarantorRepository, // นำเข้าตารางที่เกี่ยวข้อง
        private readonly paymentRepository:PaymentRepository
    ) { }

    async delete(
        models: SaleItemModel,
    ): Promise<SaleItemModel> {
        try {
              // ใช้ Transaction ในการลบแบบ soft delete
              return await this.repository.manager.transaction(async (manager) => {
                const guarantors = await this.guarantorRepository.findByIdSaleItem(models.id);
                if (guarantors.length>0) {
                    // ทำการลบแบบ soft delete สำหรับ Guarantor entities
                    await manager.softRemove(guarantors);
                }
                if(models.payments.length > 0){
                     // ทำการลบแบบ soft delete สำหรับ payments entities
                    await manager.softRemove(models.payments);
                }
                
                // ทำ soft delete สำหรับ SaleItem
                const saved: SaleItemModel = await manager.softRemove(SaleItem, models);
                return saved;
            });
        }  catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

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

    async findByIdDelete(id: number): Promise<SaleItemModel> {
        try {
            const carInformation: SaleItemModel = await this.repository.findOne({
                select: { id: true,saleType:true, payments: { id: true } },
                relations: {
                    payments: true,
                    carInformation:true
                },
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

    async summarySalesPastYear(dto): Promise<any> {
        try {
            const dayjs = require('dayjs');
            let dateStart = dayjs().subtract(5, 'year').format('YYYY-MM-DD')
            const dateEnd = dayjs().format('YYYY-MM-DD');
            const query = this.repository.createQueryBuilder('saleitem')
                .select('saleitem')
                .where(
                    'YEAR(saleitem.createdAt) BETWEEN YEAR(:dateStart) AND YEAR(:dateEnd)',
                    { dateStart, dateEnd }
                );

            const queryResult = await query.getManyAndCount();
            const [saleItems, count] = queryResult;
            return plainToInstance(SaleItemPaginationModel, {
                saleItems: saleItems,
                totalItems: count,
            } as SaleItemPaginationModel);
        } catch (err) {

            console.log(err)
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async summarySalesPastMonth(dto): Promise<any> {
        try {
            const startDate = new Date();

            // Calculate the date 5 months prior to startDate
            const pastDate = new Date(startDate);
            pastDate.setMonth(startDate.getMonth() - 5);

            // Extract years and months
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1; // getMonth() returns 0-11
            const pastYear = pastDate.getFullYear();
            const pastMonth = pastDate.getMonth() + 1;

            const query = this.repository.createQueryBuilder('saleitem')
                .select('saleitem')
                .where(
                    '(YEAR(saleitem.createdAt) > :pastYear OR (YEAR(saleitem.createdAt) = :pastYear AND MONTH(saleitem.createdAt) >= :pastMonth))',
                    { pastYear, pastMonth }
                )
                .andWhere(
                    '(YEAR(saleitem.createdAt) < :startYear OR (YEAR(saleitem.createdAt) = :startYear AND MONTH(saleitem.createdAt) <= :startMonth))',
                    { startYear, startMonth }
                );
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

    async maxid(): Promise<any> {
        try {
            const query = this.repository.createQueryBuilder('saleitem')
                .select('saleitem')
                .orderBy('saleitem.id', 'DESC')
                .limit(1);
            const queryResult = await query.getMany();
            return queryResult;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async sumRemainingBalance(){
        const query1 = this.repository.createQueryBuilder('saleitem')
        .select('SUM(COALESCE(saleitem.remainingBalance, 0))', 'remainingBalance')
        .where('saleitem.statusInstallment IS NULL')
        .andWhere('saleitem.interestType = :interestType',{interestType:'ลดต้น/ลดดอก'})
         const queryResult1 = await query1.getRawOne();

         const query2 = this.repository.createQueryBuilder('saleitem')
         .select(['saleitem.totalOrder','saleitem.interestRate','saleitem.numInstallments','saleitem.paymentAmount','saleitem.totalInterest'])
         .where('saleitem.statusInstallment IS NULL')
         .andWhere('saleitem.interestType = :interestType',{interestType:'คงที่'})
          const queryResult2 = await query2.getMany();

        return {queryResult1,queryResult2}  
    }


}