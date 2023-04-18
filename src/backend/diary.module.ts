import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { Diary } from './entities/diary.entity';
import { DiaryDetail } from './entities/diaryDetail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Diary,DiaryDetail])],
    controllers: [DiaryController],
    providers: [
        DiaryService, ],
})
export class DiaryModule {}
