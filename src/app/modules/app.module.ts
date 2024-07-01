import { Module } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppController } from '../controller/app.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
