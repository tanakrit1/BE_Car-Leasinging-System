import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/database/entities/payment.entity";
import { Repository } from "typeorm";
import { PaymentModel, PaymentPaginationModel } from "../models/payment.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";
import { CarInformationRepository } from "./carInformation.repository";
import { SaleItemRepository } from "./saleItem.repository";

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectRepository(Payment)
        private readonly repository: Repository<Payment>,
        private readonly CarInformationRepository:CarInformationRepository,
        @Inject(forwardRef(() => SaleItemRepository))
        private readonly saleItemRepository:SaleItemRepository
    ) { }

    async findById(id: number): Promise<PaymentModel> {
        try {
            const payment: PaymentModel = await this.repository.findOne({
                where: { id: id },
            });
            return payment;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async findIdSaleitem(id: number): Promise<PaymentModel> {
        try {
            const payment: PaymentModel = await this.repository.findOne({
                relations: { saleItem: true },
                where: { id: id },
            });
            return payment;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
    

    

    async search(dto: any): Promise<PaymentPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('payment')
                .select('payment')
                .leftJoinAndSelect('payment.saleItem', 'saleItem')
            applyRepositorySortingModel(query, 'payment', dto);
            applyRepositoryQuickFilter(query, 'payment', dto.filterModel);
            applyRepositoryFilterModel(query, 'payment', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [payments, count] = queryResult;
            return plainToInstance(PaymentPaginationModel, {
                payments: payments,
                totalItems: count,
            } as PaymentPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: PaymentModel): Promise<PaymentModel> {
        try {
            const entity: PaymentModel = this.repository.create(model);
            const saved: PaymentModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async delete(model: PaymentModel): Promise<PaymentModel> {
        try {
          const entity: PaymentModel = this.repository.create(model);
          const deleted: PaymentModel = await this.repository.softRemove(entity);
          return deleted;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
    }


    async dashboardPastYear(dto){
        try {
            const dayjs = require('dayjs');
            let dateStart  = dayjs().subtract(5, 'year').format('YYYY-MM-DD')
            const dateEnd = dayjs().format('YYYY-MM-DD');
            const query = this.repository.createQueryBuilder('payment')
            .select('payment')
            .where(
                'YEAR(payment.createdAt) BETWEEN YEAR(:dateStart) AND YEAR(:dateEnd)',
                { dateStart, dateEnd }
            );
            query.orderBy(`payment.createdAt`, 'DESC');
            const queryResult = await query.getManyAndCount();
            const [payments, count] = queryResult;
            return plainToInstance(PaymentPaginationModel, {
                payments: payments,
                totalItems: count,
            } as PaymentPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async dashboardPastMonth(dto){
        try {
            const startDate = new Date();
    
            // Calculate the date 5 months prior to startDate
            const pastDate = new Date(startDate);
            pastDate.setMonth(startDate.getMonth() - 4); //5 เดือน
    
            // Extract years and months
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1; // getMonth() returns 0-11
            const pastYear = pastDate.getFullYear();
            const pastMonth = pastDate.getMonth() + 1;
            const query = this.repository.createQueryBuilder('payment')
                .select('payment')
                .where(
                    '(YEAR(payment.createdAt) > :pastYear OR (YEAR(payment.createdAt) = :pastYear AND MONTH(payment.createdAt) >= :pastMonth))',
                    { pastYear, pastMonth }
                )
                .andWhere(
                    '(YEAR(payment.createdAt) < :startYear OR (YEAR(payment.createdAt) = :startYear AND MONTH(payment.createdAt) <= :startMonth))',
                    { startYear, startMonth }
                );
                query.orderBy(`payment.createdAt`, 'DESC');
            const queryResult = await query.getManyAndCount();
            const [payments, count] = queryResult;
            return plainToInstance(PaymentPaginationModel, {
                payments: payments,
                totalItems: count,
            } as PaymentPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async reportPayment(dto) {
        try {
            const startDate = new Date(dto.date);
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1; 
        //------------------------------------------------------------------------------------------------------------------//
            const query = this.repository.createQueryBuilder('payment')
                .select('SUM(COALESCE(payment.amountPay, 0))', 'totalAmountPay')
                .addSelect('SUM(COALESCE(payment.InterestPay, 0))', 'totalInterestPay')
                .addSelect('SUM(COALESCE(payment.fee, 0))', 'totalFee')
                .addSelect('SUM(COALESCE(payment.amountPay, 0) + COALESCE(payment.InterestPay, 0) + COALESCE(payment.fee, 0))', 'grandTotal')
                .where(
                    'YEAR(payment.createdAt) = :startYear AND MONTH(payment.createdAt) = :startMonth',
                    { startYear, startMonth }
                )
                .orderBy('payment.createdAt', 'DESC');
    
            const queryResult = await query.getRawOne();
        //------------------------------------------------------------------------------------------------------------------//
            const queryTransection = this.repository.createQueryBuilder('payment')
            .leftJoinAndSelect('payment.saleItem', 'saleItem')
            .leftJoinAndSelect('saleItem.carInformation', 'carInformation')
            .where(
                'YEAR(payment.createdAt) = :startYear AND MONTH(payment.createdAt) = :startMonth',
                { startYear, startMonth }
            )
            .orderBy('payment.createdAt', 'DESC');
            const queryResultTran = await queryTransection.getMany();
       //------------------------------------------------------------------------------------------------------------------//
            const soldCount = await this.saleItemRepository.soldCount(startYear,startMonth)
        //------------------------------------------------------------------------------------------------------------------//
            const carInformation = await this.CarInformationRepository.reportPayment(startYear,startMonth)
        //------------------------------------------------------------------------------------------------------------------//
            const saleItem = await this.saleItemRepository.sumRemainingBalance()

            let totalInstallmentBal = 0
            // console.log(saleItem.queryResult2)
            saleItem.queryResult2.forEach(saleitem => {
                const numInstallments = saleitem.numInstallments&& parseFloat(saleitem.numInstallments)||0;
                const interestRate = saleitem.interestRate||0;
                const totalOrder = Number(saleitem.totalOrder)||0;
                const paymentAmount = Number(saleitem.paymentAmount)||0;
                const totalInterest = Number(saleitem.totalInterest)||0;
              
                // totalInstallmentBal +=((Math.ceil((totalOrder / numInstallments)) + Math.ceil((totalOrder * interestRate / 100))) * numInstallments) - Math.ceil((0 + 0));
                if (numInstallments > 0 && totalOrder > 0) {
                const interestAmount = Math.ceil(totalOrder * interestRate / 100);
                const installmentAmount = Math.ceil(totalOrder / numInstallments + interestAmount);
                const totalInstallments = Math.ceil(installmentAmount * numInstallments);
                const installmentBalance = Math.ceil(totalInstallments - (paymentAmount + totalInterest));
                totalInstallmentBal += installmentBalance;
                }
            });
        //------------------------------------------------------------------------------------------------------------------//
        console.log("totalInstallmentBal",totalInstallmentBal,'queryResult1',saleItem.queryResult1.remainingBalance)
            return {
                Result:{
                    ...queryResult,
                    soldCount:soldCount?.soldCount||0,
                    totalCost:carInformation?.totalCost||0,
                    totalInstallmentBal: totalInstallmentBal+Number(saleItem.queryResult1.remainingBalance),
                },
                Transection:queryResultTran,
                TransectionSold:soldCount.soldCountTran
            };

        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    // async deleteMany(model: PaymentModel[]): Promise<PaymentModel[]> {
    //     try {
    //       const entity: PaymentModel[] = this.repository.create(model);
    //       const deleted: PaymentModel[] = await this.repository.softRemove(entity);
    //       return deleted;
    //     } catch (err) {
    //       throw new InternalServerErrorException(err.message + err?.query);
    //     }
    //   }

}