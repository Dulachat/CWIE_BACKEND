/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private  readonly companyService: CompanyService){}

    @Post('createCompany')
    create(@Body() createCompanyDto:CreateCompanyDto){
        return this.companyService.create(createCompanyDto)
    }

    @Get('allCompany')
    findAll(){
        return this.companyService.findAll()
    }
    @Get('oneCompany/:id')
    findOne(@Param('id') id:number){
        return this.companyService.findOne(id)
    }

    @Delete('deleteCompany/:id')
    remove(@Param('id') id:number){
        return this.companyService.remove(id)
    }

    @Patch('updateCompany/:id')
    update(@Param('id') id:number , @Body() updateCompanyDto:UpdateCompanyDto){
        return this.companyService.update(id,updateCompanyDto)
    }
}
