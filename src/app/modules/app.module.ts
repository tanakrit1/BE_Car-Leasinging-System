import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppController } from '../controller/app.controller';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { JwtAuthMiddleware } from '../middlewares/jwt.middleware';
import { ConfigurationModule } from './confuguration.module';
import { CarInformationModule } from './carInformation.module';
import { SaleItemModule } from './saleItem.module';
import { GuarantorModule } from './guarantor.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    UserModule,
    AuthModule,
    CarInformationModule,
    SaleItemModule,
    GuarantorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/auth/sign-in', method: RequestMethod.POST },
        { path: '/auth/verify-token', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
