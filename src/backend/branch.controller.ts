/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller("branch")
export class BranchController {
    constructor(private readonly branchService:BranchService){}

    @Get("allBranch")
    findAll(){
        return this.branchService.findAll();
    }

    @Post('createBranch')
    create(@Body() createBranchDto:CreateBranchDto ){
        return this.branchService.create(createBranchDto);
    }

    @Get('oneBranch/:id')
    findOne(@Param('id') id:number){
        return this.branchService.findOne(id)
    }

    @Delete('deleteBranch/:id')
    remove(@Param('id') id:number){
        return this.branchService.remove(id)
    }

    @Patch('updateBranch/:id')
    update(@Param('id') id:number , @Body() updateBranchDto:UpdateBranchDto){
        return this.branchService.update(id,updateBranchDto)
    }
    

}
