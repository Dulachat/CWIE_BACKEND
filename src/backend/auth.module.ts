import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { StudentModule } from './student.module';

@Module({
    imports: [JwtModule.register(
        {
            secret: 'secret',
            signOptions: { expiresIn: "10h" }
        }
    ), UsersModule, StudentModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
