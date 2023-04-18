/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { Repository } from 'typeorm';
import { DiaryDetail } from './entities/diaryDetail.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { table } from 'console';

@Injectable()
export class DiaryService {
    constructor(
        @InjectRepository(Diary)
        private diaryRepository: Repository<Diary>,
        @InjectRepository(DiaryDetail)
        private diaryDetailRepository: Repository<DiaryDetail>
    ) { }

    findAll() {
        return this.diaryRepository.find({
            relations: ["Detail","StudentDiary"]
        })
    }


    findOne(date: string) {
        return this.diaryRepository.findOne({
            where: { diary_date: date },
            relations: ["Detail"]
        })
    }


    findOneId(id: any) {
        return this.diaryRepository.findOne({
            where: { id: id },
            relations: ["Detail"]
        })
    }

    async create(createDiaryDto: CreateDiaryDto) {

        const diary = await this.diaryRepository.findOne({
            where: { diary_date: createDiaryDto.diary_date }
        })

        if (diary != null) {
            return diary
        }
        if (diary === null) {
            const newDetail = new DiaryDetail()
            const newDiary = new Diary()
            newDiary.diary_date = createDiaryDto.diary_date
            newDiary.student_id = createDiaryDto.student_id
            newDiary.Detail = newDetail
            return this.diaryRepository.save(newDiary)
        }

    }

    async update(date: any, createDiaryDto: CreateDiaryDto) {


        const dateSelect = await this.diaryRepository.findOne({
            where: { diary_date: date },
            relations: ["Detail"]
        })

        dateSelect.time_in = createDiaryDto.time_in
        dateSelect.time_out = createDiaryDto.time_out
        const findDetail = await this.diaryDetailRepository.findOne({
            where: { id: parseInt(dateSelect.diary_detail_id) }
        })
        findDetail.detail_text = createDiaryDto.detail_text

        const log = await this.diaryDetailRepository.update(findDetail.id, findDetail)
        return await this.diaryRepository.update(dateSelect.id, dateSelect)
    }
}
