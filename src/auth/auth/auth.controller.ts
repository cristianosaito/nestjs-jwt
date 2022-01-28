import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../role.decorator';
import { RoleGuard } from '../role.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('login')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async Login(@Body() body) {
    const token = await this.authService.Login(body.username, body.password);
    return token;
  }

  @Role('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('test')
  async test(@Body() body) {
    const passHash = await this.authService.generateHash(body.pass);
    const chechThisHash = await this.authService.checkHash(body.pass, passHash);
    const token = await this.authService.getToken();

    return { hash: passHash, checkHash: chechThisHash, token: token };
  }
}
