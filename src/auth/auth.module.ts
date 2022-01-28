import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'abcde123456',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
