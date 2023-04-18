
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScoreForm08Dto } from './dto/create-scoreForm08.dto';
import { FormInTP08 } from './entities/formintp08.entity';
import { FormInTP09 } from './entities/formintp09.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import { CreateScoreForm09Dto } from './dto/create-scoreForm09.dto';


@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(FormInTP08)
        private form08Repository: Repository<FormInTP08>,
        @InjectRepository(FormInTP09)
        private form9Repository: Repository<FormInTP09>,
        @InjectRepository(AssessmentDetail)
        private readonly asDetailRepository: Repository<AssessmentDetail>,

    ) { }

    async createForm08(id: any, createForm08: CreateScoreForm08Dto) {

        const asDetail = await this.asDetailRepository.findOne({
            where: { student_id: id }
        })

        return await this.form08Repository.update(asDetail.form08Id, createForm08)
    }

    async createForm09(id: any, createForm09: CreateScoreForm09Dto) {

        const asDetail = await this.asDetailRepository.findOne({
            where: { student_id: id }
        })

        return await this.form9Repository.update(asDetail.form09Id, createForm09)
    }
}
