import { Body, Controller, Post} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import {
  Auth
} from '@microservices-communication/proto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @GrpcMethod('AuthService', 'verify')
  async verify(data: Auth.VerificationRequest): Promise<Auth.VerificationResponse> {
    const profile = await this.service.profileByToken(data.token);
    const resp = Auth.VerificationResponse.fromJSON({
      status: profile ? 200 : 401,
      profile: profile ? profile : null,
    });
    return resp;
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.service.login(body);
  }

}
