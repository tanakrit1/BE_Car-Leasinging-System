import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/database/entities/payment.entity";
import { Repository } from "typeorm";
import { PaymentModel, PaymentPaginationModel } from "../models/payment.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectRepository(Payment)
        private readonly repository: Repository<Payment>
    ) { }

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

}