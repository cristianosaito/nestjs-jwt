import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  saltOrRounds = 10;

  genHash = (pass): Promise<string> => {
    return bcrypt.hash(pass, this.saltOrRounds);
  };

  checkHash = (pass, hash): Promise<boolean> => {
    return bcrypt.compare(pass, hash);
  };
}
