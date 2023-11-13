import { Inject, Injectable, Scope, ValidationPipe } from '@nestjs/common';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { ProfileResponseDto } from './dtos/profile-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const token = await this.jwtService.signAsync({
      userName: request.userName,
      age: request.age,
    });

    const result = { token };
    return plainToClass(LoginResponseDto, result, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  async profileByToken(token: string): Promise<ProfileResponseDto | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET,
      });
      return plainToClass(ProfileResponseDto, payload, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
    } catch {
      return null;
    }
  }

}
