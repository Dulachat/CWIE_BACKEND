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
            relations: ["Detail", "StudentDiary"]
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


    findById(id: any) {
        return this.diaryRepository.find({
            where: { student_id: id },
            relations: ["Detail", "StudentDiary"],
            order: { diary_date: 'DESC' }
        })
    }

    async create(createDiaryDto: CreateDiaryDto) {
        try {
            const diary = await this.diaryRepository.findOne({
                where: { diary_date: createDiaryDto.diary_date }
            })
            let dataObj = {}
            if (diary !== null) {
                return diary
            }
            if (diary === null) {
                const newDetail = new DiaryDetail();
                const newDiary = new Diary();
                newDiary.diary_date = createDiaryDto.diary_date
                newDiary.student_id = createDiaryDto.student_id
                newDiary.Detail = newDetail
                return await this.diaryRepository.manager.save(newDiary)
            }
        } catch (error) {
            return error
        }



    }

    async update(date: any, createDiaryDto: CreateDiaryDto) {
        const dateSelect = await this.diaryRepository.findOne({
            where: { diary_date: date },
            relations: ["Detail"]
        })
        dateSelect.time_in = createDiaryDto.time_in
        dateSelect.time_out = createDiaryDto.time_out
        dateSelect.diary_comment = createDiaryDto.diary_comment
        const findDetail = await this.diaryDetailRepository.findOne({
            where: { id: parseInt(dateSelect.diary_detail_id) }
        })
        findDetail.detail_text = createDiaryDto.detail_text

        const log = await this.diaryDetailRepository.update(findDetail.id, findDetail)
        return await this.diaryRepository.update(dateSelect.id, dateSelect)
    }
}
