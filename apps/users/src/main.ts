/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClientOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  const restPort = process.env.REST_PORT || 3000;
  const grpcPort = process.env.GRPC_PORT || 3005;

  const authGrpcServiceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
      url: `localhost:${grpcPort}`,
      package: 'v1.auth',
      protoPath: join(__dirname, '/../../../proto/src/proto/v1/auth.proto'),
    },
  };
  
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.connectMicroservice(authGrpcServiceOptions)
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  await app.startAllMicroservices();
  await app.listen(restPort);
  Logger.log( `🚀 Rest application is running on: http://localhost:${restPort}/${globalPrefix}`);
  Logger.log( `🚀 Grpc application is running on: http://localhost:${grpcPort}`);
}

bootstrap();
