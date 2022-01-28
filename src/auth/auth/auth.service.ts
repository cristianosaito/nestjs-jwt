import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { genToken } from '../../utils/jwt';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private usersService: UsersService,
  ) {}

  async generateHash(pass) {
    const passHash = await this.bcryptService.genHash(pass);
    return passHash;
  }

  async checkHash(pass, hash) {
    const isHashChecked = await this.bcryptService.checkHash(pass, hash);
    return isHashChecked;
  }

  async Login(userName: string, password: string) {
    const user = await this.validateCredentials(userName, password);

    if (!(user instanceof User)) return user;
    const payload = {
      sub: user.id,
      username: user.name,
      role: user.role,
    };
    return {
      user: user.name,
      role: user.role,
      token: this.jwtService.sign(payload),
    };
  }

  async validateCredentials(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(userName);
    if (!user) return 'usuário não encontrado';

    const check =
      user.username === userName &&
      (await this.checkHash(password, user.password));

    if (!check) return 'senha errada';

    return user;
  }

  getToken() {
    return genToken();
  }
}
