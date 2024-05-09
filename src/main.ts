import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { METHODS } from './constants/methods.constants';
import * as express from 'express';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    exposedHeaders: 'set-cookie',
    credentials: true,
    methods: METHODS,
  });
  app.use(express.json({ limit: '50mb' }));

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(8000);
}
bootstrap();
