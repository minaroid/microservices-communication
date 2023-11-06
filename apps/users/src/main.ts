/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  // gRpc Server
  const gRpcPort = process.env.GRPC_PORT || 3005;
  const gRpcApp = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${gRpcPort}`,
      protoPath: `${__dirname}/../../../proto/src/proto/v1/auth.proto`,
      package: 'v1.auth',
    },
  });
  gRpcApp.listen();
  Logger.log(
    `🚀 Users gRpc server is running on: http://localhost:${gRpcPort}`
  );

  // Rest Server
  const restApp = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  restApp.setGlobalPrefix(globalPrefix);
  restApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  const port = process.env.REST_PORT || 3000;
  await restApp.listen(port);
  Logger.log(
    `🚀 Users rest server is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
