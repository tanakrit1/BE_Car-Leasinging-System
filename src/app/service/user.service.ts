import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserModel, UserPaginationModel } from "../models/user.model";
import { CreateUserDto } from "../dto/user/user.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async search(dto): Promise<UserPaginationModel> {
    const models = await this.userRepository.search(dto);
    return models
  }

  async create(dto: CreateUserDto): Promise<UserModel> {
    const model: UserModel = plainToInstance(UserModel, dto);
    return await this.userRepository.save(model);
  }
}