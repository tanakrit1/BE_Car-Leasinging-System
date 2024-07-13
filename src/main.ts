import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  // ตั้งค่า limit ที่ 512kb
  app.use(bodyParser.json({ limit: '512kb' }));
  app.use(bodyParser.urlencoded({ limit: '512kb', extended: true }));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3900);
}
bootstrap();
