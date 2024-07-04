
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from '../passports/jwt.strategy';
import { LocalStrategy } from '../passports/local.strategy';



@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy],
  exports: [AuthService],
})
export class AuthModule { }
