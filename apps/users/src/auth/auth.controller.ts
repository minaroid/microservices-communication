import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { AuthGuard } from '../guards/AuthGuard';
import { ProfileResponseDto } from './dtos/profile-response.dto';
import {
  VerificationResponse,
  VerificationRequest,
} from '@microservices-communication/proto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @GrpcMethod('AuthService', 'verify')
  async verify(data: VerificationRequest): Promise<VerificationResponse> {
    const profile = await this.service.profileByToken(data.token);
    const resp = VerificationResponse.fromJSON({
      status: profile ? 200 : 401,
      profile: profile ? profile : null,
    });
    return resp;
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.service.login(body);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req): Promise<ProfileResponseDto> {
    const userName = req?.user?.userName ?? '';
    return await this.service.profileByUserName(userName);
  }
}
