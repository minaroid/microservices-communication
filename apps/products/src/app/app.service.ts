import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(user: any): Promise<{ message: string }> {
    return { message: `Hello ${user.userName}` };
  }
}
