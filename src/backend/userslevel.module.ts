import { UserslevelService } from './userslevel.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { userLevel } from './entities/users_level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserslevelController } from './userslevel.controller';

@Module({
    imports: [TypeOrmModule.forFeature([userLevel])],
    controllers: [UserslevelController],
    providers: [
        UserslevelService,],
})
export class UserslevelModule { }
