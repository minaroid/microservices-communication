import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';


import { CartService } from './cart.service';
import { CartRequestDto } from './dtos/cart-request.dto';
import { AuthGuard } from '@microservices-communication/guards';

@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) {}
  
  @Post('/update')
  @UseGuards(AuthGuard)
  updateCart(@Req() request, @Body() product: CartRequestDto){
    return this.cartService.update(product,request.user);
  }

}
