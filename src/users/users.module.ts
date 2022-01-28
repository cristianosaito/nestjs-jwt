import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService, BcryptService],
})
export class UsersModule {}
