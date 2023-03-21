import { BranchService } from './branch.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Branch } from './entities/branch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './branch.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    controllers: [BranchController],
    providers: [
        BranchService,],
})
export class BranchModule { }
