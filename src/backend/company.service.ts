
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const check = await this.companyRepository.findOne({
      where: { company_name: createCompanyDto.company_name },
    });
    if (check != null) {
      //  console.log(check)
      return 'error';
    }
    if (check === null) {
      await this.companyRepository.save(createCompanyDto);
      return 'success';
    }
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: number) {
    return this.companyRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.companyRepository.update(id, updateCompanyDto);
      return 'success';
    } catch (err) {
      return 'err';
    }
  }

  async remove(id: number) {
    const removeCompany = await this.companyRepository.findOne({
      where: { id: id },
    });
    return this.companyRepository.remove(removeCompany);
  }
}
