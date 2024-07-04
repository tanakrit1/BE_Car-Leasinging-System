import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { plainToInstance } from "class-transformer";
import { UserModel } from "../models/user.model";
import { AuthResponseVm } from "../view-model/auth/auth-response.vm";
import { Request } from "express";
import { omit } from "lodash";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { LocalAuthGuard } from "../guards/local.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,

  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Req() request: Request): Promise<any> {
    try {
      const user: UserModel = plainToInstance(UserModel, {
        ...request.user,
      });
      const token: any = this.service.getCookieJwtAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      return AuthResponseVm.convertToViewModel({
        ...token,
        profile: omit(user, [
          'createdAt',
          'updatedAt',
          'deletedAt',
        ]),
      })
    } catch (err) {
      throw HandleErrorException(err)
    }
  }

}