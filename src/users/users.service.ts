import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPass = await this.bcryptService.genHash(createUserDto.password);
    createUserDto.password = hashedPass;

    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findByPk(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { username: email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    return user.update(updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);
    return user.destroy();
  }
}
