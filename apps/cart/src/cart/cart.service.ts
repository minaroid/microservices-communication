import { Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {ProductEntity} from '@microservices-communication/entities';
import { CartRequestDto } from './dtos/cart-request.dto';
import { Product } from '@microservices-communication/proto';
import { ServiceError, credentials } from '@grpc/grpc-js';
import { Kafka, Producer } from 'kafkajs';
import { Topics } from '@microservices-communication/kafka';

@Injectable()
export class CartService implements OnModuleInit {
  private client: Product.ProductServiceClient;
  private readonly kafkaInstance: Kafka;
  private producer: Producer;

  onModuleInit() {
    this.client = new Product.ProductServiceClient(
      process.env.PRODUCTS_SERVICE_GRPC,
      credentials.createInsecure()
    );
  }

  constructor() {
    this.kafkaInstance = new Kafka({
      brokers: [process.env.KAFKA_BROKER_URL],
    });

    this.producer = this.kafkaInstance.producer();
  }

  cart: any = []

  private getProductById = (id: number): Promise<Product.GetProductByIdResponse> => {
    return new Promise((resolve, reject) => {
      this.client.getProductById(
        Product.GetProductByIdRequest.fromJSON({ id }),
        (error: ServiceError, response: Product.GetProductByIdResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  };
  
  async update(itemToUpdate: CartRequestDto, user: any): Promise<{product: ProductEntity, quantity: number}[]> {
    if(!user.userName){
      throw new UnauthorizedException()
    }
    
    const response = await this.getProductById(itemToUpdate.productId)

    if(response.status === 200 && response.product){
      
      const key = user.userName
      const productKey = itemToUpdate.productId

      let cartItems = this.cart[key] ?? {}
      let quantity = itemToUpdate.quantity
      const product = {name: response.product.name, price: response.product.price}
      
      if(cartItems[productKey]){
        cartItems[productKey].quantity += quantity
        quantity = cartItems[productKey].quantity
      } 
    
      if(quantity > response.product.quantity){
         throw new NotFoundException("Needed quantity not found!")
      }

      cartItems = {...cartItems, [productKey]: {quantity: quantity, product}}
  
      this.cart =  {...this.cart,  [key]: cartItems }
      
      this.publish({productId: productKey, newQuantity: response.product.quantity - quantity})
    return this.cart[user.userName] ?? {};
    }
    throw new NotFoundException("")
   
    // TODO publish product quantity changes.
  }

  async publish(message: any){
    await this.producer.connect();
    await this.producer.send({
      topic: Topics.CartCrud,
      messages: [{ value: JSON.stringify({message}) }],
    });
  }
  
}
