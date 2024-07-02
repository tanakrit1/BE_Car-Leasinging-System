import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { UserPaginationVm, UserResponseVm } from "../view-model/user/user.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { CreateUserDto, SearchUserDto } from "../dto/user/user.dto";
import { UserModel } from "../models/user.model";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('search')
  async search(@Body() dto: SearchUserDto): Promise<UserPaginationVm> {
    try {
      const responses = await this.userService.search(dto)
      const pagination: PaginationMetadataModel = {
        page: dto.page,
        perPage: dto.limit,
        totalItems: responses.totalItems,
      };
      return UserPaginationVm.convertToViewModel(responses, pagination)
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post()
  async create(
    @Body() createRequestVm: CreateUserDto,
  ): Promise<UserResponseVm> {
    try {
      // createRequestVm.password = this.authService.hashPassword(
      //   createRequestVm.password,
      // );
      const created: UserModel = await this.userService.create(createRequestVm);
      return UserResponseVm.convertToViewModel(created);
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }


}