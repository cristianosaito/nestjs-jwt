import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/entities/order.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    OrdersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'db',
      port: 3307,
      username: 'admin',
      password: 'admin123',
      database: 'fin',
      models: [Order],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService, TestService],
})
export class AppModule {}
