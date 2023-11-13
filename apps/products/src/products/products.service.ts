import { Injectable } from '@nestjs/common';
import {ProductEntity} from '@microservices-communication/entities';
import { CartCrudPayload, MessageDto } from '@microservices-communication/kafka';

@Injectable()
export class ProductsService {
  
  products: ProductEntity[] =  [
    new ProductEntity(1, 5, 55, "iPhone"),
    new ProductEntity(2, 20, 100, "Laptop"),
    new ProductEntity(3, 10, 100.5, "Mouse"),
  ]
  
  async getAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async getProductById(id: number): Promise<ProductEntity | null> {
    return this.products.filter((p) => p.id === id)?.[0] ?? null;
  }
  
  onCartCrud(message: MessageDto<CartCrudPayload>): void {
    this.products.forEach((p) => {
      if(p.id === message.message?.productId){
        p.quantity = message.message?.newQuantity
      }
    })
  }
  
}
