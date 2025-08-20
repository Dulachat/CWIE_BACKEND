import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { StudentModule } from './student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserAssessment } from './entities/UserAssessment.entity';

@Module({
    imports: [JwtModule.register(
        {
            secret: 'secret',
            signOptions: { expiresIn: "10h" }
        }
    ), UsersModule, StudentModule, TypeOrmModule.forFeature([Users, UserAssessment])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
