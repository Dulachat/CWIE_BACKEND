/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
    constructor(
       @InjectRepository(Branch)
       private branchRepository: Repository<Branch>,
     ){}

    findAll(){
        return this.branchRepository.find();
    }

   async create(createBranchDto:CreateBranchDto) {

        const check = await this.branchRepository.findOne({
            where: { branch_name: createBranchDto.branch_name }
        })
        if(check != null) {
            return "error"
        }
        if(check === null){
            this.branchRepository.save(createBranchDto);
            return "success";
        }  
    }

    findOne(id: number) {
        return this.branchRepository.findOne({
            where: { id: id }
        })
    }

    async update(id: number, updateBranchDto: UpdateBranchDto) {
        const check = await this.branchRepository.findOne({
            where: { branch_name: updateBranchDto.branch_name }
        })
        if (check != null) {
            //  console.log(check)
            return "error"
        } if (check === null) {
            await this.branchRepository.update(id, updateBranchDto);
            return "success"
        }

    }

    async remove(id: number) {
        const removeBranch = await this.branchRepository.findOne({
            where: { id: id }
        })
        return this.branchRepository.remove(removeBranch)
    }



 }
