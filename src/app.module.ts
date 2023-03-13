import { UsersModule } from './backend/users.module';
import { UsersController } from './backend/users.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [
    UsersModule, TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cwie',
      entities: [],
      synchronize: true,
    }),],
  controllers: [
    UsersController,
    UsersController, AppController],
  providers: [AppService],
})
export class AppModule { }
