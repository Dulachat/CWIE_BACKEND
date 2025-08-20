import { UsersService } from './users.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UserAssessment } from './entities/UserAssessment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users, UserAssessment])],
    controllers: [UsersController],
    providers: [UsersService,],
    exports: [UsersService],
})
export class UsersModule { }
