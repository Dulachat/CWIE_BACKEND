/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('Diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) { }


    @Post('addDiary')
    create(@Body() createDiaryDto: CreateDiaryDto) {
        return this.diaryService.create(createDiaryDto);
    }

    @Patch('updateDairy/:date')
    update(@Param('date') date: any, @Body() createDiaryDto: CreateDiaryDto) {
        return this.diaryService.update(date, createDiaryDto);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file) {
        return `${process.env.CWIE_API_URL}/Diary/uploads/${file.filename}`
    }

    @Get('uploads/:image')
    getImage(@Param('image') image, @Res() res) {
        return res.sendFile(image, { root: './uploads' }
        )
    }

    @Get('allDiary')
    getDiary() {
        return this.diaryService.findAll();
    }


    @Get('oneDiary/:date')
    getOneDiary(@Param('date') date: string) {
        return this.diaryService.findOne(date);
    }
    @Get('oneDiaryId/:id')
    getOneDiaryId(@Param('id') id: any) {
        return this.diaryService.findOneId(id);
    }

    @Get('ListDiary/:id')
    getListDiaryId(@Param('id') id: any) {
        return this.diaryService.findById(id);
    }


}
