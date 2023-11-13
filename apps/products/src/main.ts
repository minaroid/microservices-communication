/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { Consumers } from '@microservices-communication/kafka';
import { join } from 'path';

async function bootstrap() {
  
  const restPort = process.env.REST_PORT || 4000;
  const grpcPort = process.env.GRPC_PORT || 4005;

  const kafkaServiceOptions: ClientOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER_URL],
      },
      consumer: {
        groupId: Consumers.CartCrud,
      },
    },
  };

  const productGrpcServiceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
      url: `localhost:${grpcPort}`,
      package: 'v1.product',
      protoPath: join(__dirname, '/../../../proto/src/proto/v1/product.proto'),
    },
  };
  
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(kafkaServiceOptions)
  app.connectMicroservice(productGrpcServiceOptions)

  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(restPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${restPort}/${globalPrefix}`
  );
}

bootstrap();
