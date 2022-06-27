import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Visit http://localhost:3333/docs for documentation';
  }
}
