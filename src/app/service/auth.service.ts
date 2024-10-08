import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { UserModel } from "../models/user.model";
import { UsernameIncorrectException } from "../exceptions/username-incorrect.exception";
import { PasswordIncorrectException } from "../exceptions/password-incorrect.exception";
import { plainToInstance } from "class-transformer";
import { UserDto } from "../dto/user/user.dto";
import { omit } from 'lodash';
import { FailedVerifyTokeyException } from "../exceptions/FailedVerifyTokeyException";
import * as crypto from 'node:crypto';
import { AuthGenerateTokenRequestDto } from "../view-model/auth/auth-response.vm";
import { AuthTokenModel } from "../models/auth-token.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  hashPassword(password: string): string {
    const hash = crypto
      .createHmac('sha256', process.env.PASSWORD_SECRET)
      .update(password)
      .digest('hex');
    return hash;
  }

  async validateUser(authSignInRequestDto: any): Promise<UserModel> {
    const user :UserModel = await this.userService.validate(authSignInRequestDto.username) 
    if(!user){
      throw new UsernameIncorrectException();
    }
    const userDto: UserDto = plainToInstance(UserDto, user as UserDto);
    const HmacPass = this.hashPassword(authSignInRequestDto.password);
    if (user.password !== HmacPass) {
      // await this.updateUser(userDto);
      throw new PasswordIncorrectException(
        `รหัสผ่านไม่ถูกต้อง`,
      );
    } 
    return  plainToInstance(
        UserModel,
        omit(user, ['password']) as UserModel,
      )
  }

  verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.payload;
    } catch {
      throw new FailedVerifyTokeyException();
    }
  }
  

  getCookieJwtAccessToken(
    payload: AuthGenerateTokenRequestDto,
  ): AuthTokenModel {
    return plainToInstance(AuthTokenModel,{
      token_type: 'Bearer',
      access_token: this.jwtService.sign({ payload }),
    })
  }

}