import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { UserPaginationVm } from "../view-model/user/user.vm";
import { PaginationMetadataModel } from "../models/base.model";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('search')
  async search(@Body() dto: any): Promise<UserPaginationVm> {
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
}