import { ServiceError, credentials } from '@grpc/grpc-js';
import {
  AuthServiceClient,
  VerificationRequest,
  VerificationResponse,
} from '@microservices-communication/proto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  private client: AuthServiceClient;

  onModuleInit() {
    this.client = new AuthServiceClient(
      process.env.USERS_SERVICE_GRPC,
      credentials.createInsecure()
    );
  }

  private verify = (token: string): Promise<VerificationResponse> => {
    return new Promise((resolve, reject) => {
      this.client.verify(
        VerificationRequest.fromJSON({ token }),
        (error: ServiceError, response: VerificationResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.verify(token);
      if (payload.status === 200) {
        request['user'] = payload.profile;
      } else {
        throw new UnauthorizedException();
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
