import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  exibir() {
    return 'test 2';
  }
}
