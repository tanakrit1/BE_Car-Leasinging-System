import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { UserModel, UserPaginationModel } from "../models/user.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
      ) { }

      async search(dto: any): Promise<UserPaginationModel> {
        try {
          const query = this.repository.createQueryBuilder('user').select('user');
          applyRepositorySortingModel(query, 'user', dto);
          applyRepositoryQuickFilter(query, 'user', dto.filterModel, [
            'username',
            'firstName',
          ]);
          applyRepositoryFilterModel(query, 'user', dto.filterModel);
          query.skip((dto.page - 1) * dto.limit).take(dto.limit)
          const queryResult = await query.getManyAndCount();
          const [users, count] = queryResult;
          return plainToInstance(UserPaginationModel, {
            users: users,
            totalItems: count,
          } as UserPaginationModel);
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }

      async save(model: UserModel): Promise<UserModel> {
        try {
          const entity: UserModel = this.repository.create(model);
          const saved: UserModel = await this.repository.save(entity);
          return saved;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }
}