import { Controller, Get, UseGuards } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import {
  Product,
} from '@microservices-communication/proto';

import { ProductsService } from './products.service';
import { AuthGuard } from '@microservices-communication/guards';
import { ParseMessagePipe, Topics } from '@microservices-communication/kafka';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'getProductById')
  async getProductById(data: Product.GetProductByIdRequest): Promise<Product.GetProductByIdResponse> {
    const product = await this.productsService.getProductById(data.id);
    const resp = Product.GetProductByIdResponse.fromJSON({
      status: product ? 200 : 404,
      product: product ? product : null,
    });
    return resp;
  }

  @MessagePattern(Topics.CartCrud)
  onCartCrud(@Payload(new ParseMessagePipe()) message): void {
    return this.productsService.onCartCrud(message);
  }
  
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.productsService.getAll();
  }

}
