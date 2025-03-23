import { status } from './entities/assessmentHeader.entity';
import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Get,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';
import { PinoLogger } from 'util/logger';
import * as fs from 'fs';
import { error } from 'console';
@Controller('Diary')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly logger: PinoLogger,
  ) {}

  @Post('addDiary/:student_id')
  create(
    @Body() createDiaryDto: CreateDiaryDto,
    @Param('student_id') student_id: string,
  ) {
    return this.diaryService.create(createDiaryDto, student_id);
  }

  @Patch('updateDairy/:date/:student_id')
  update(
    @Param('date') date: any,
    @Body() createDiaryDto: CreateDiaryDto,
    @Param('student_id') student_id: string,
  ) {
    return this.diaryService.update(date, createDiaryDto, student_id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${path.extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    try {
      // const resizedImageBuffer = await sharp(file.path)
      //   .resize(640, 640)
      //   .toBuffer();
      // const resizedFileName = `img_${file.filename}`;
      // const resizedFilePath = `./uploads/${resizedFileName}`;
      // fs.writeFileSync(resizedFilePath, resizedImageBuffer);
      // const res = JSON.stringify({
      //   path: ``,
      //   original: file.path,
      // });
      return `${process.env.CWIE_API_URL}/Diary/${file.path}`;
    } catch (error) {
      console.error('Error processing file:', error);
      return 'Error processing file.';
    }
  }

  @Patch('/delete/image')
  async deleteImage(@Body() body, @Res() res: Response, @Req() req) {
    console.log('Delete image', req);
    await this.diaryService.deleteImage(body.path);
    res.status(HttpStatus.OK);
    res.json({ success: true });
  }

  @Get('uploads/:image')
  getImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Get('allDiary/:student_id')
  getDiary(@Param('student_id') student_id: string) {
    return this.diaryService.findAll(student_id);
  }

  @Get('oneDiary/:date/:student_id')
  getOneDiary(
    @Param('date') date: string,
    @Param('student_id') student_id: string,
  ) {
    return this.diaryService.findOne(date, student_id);
  }
  @Get('oneDiaryId/:id/:student_id')
  getOneDiaryId(@Param('id') id: any, @Param('student_id') student_id: string) {
    return this.diaryService.findOneId(id, student_id);
  }

  @Get('ListDiary/:id')
  getListDiaryId(@Param('id') id: any) {
    return this.diaryService.findById(id);
  }

  @Delete('removeDiary/:diaryId/:detailId')
  async removeDiary(@Param() param, @Res() res: Response) {
    try {
      const { diaryId, detailId } = param;
      const result = await this.diaryService.removeDiary(diaryId, detailId);
      res.status(HttpStatus.OK);
      res.json({ success: true, message: 'delete completed', context: result });
    } catch (error) {
      this.logger.error(error);
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        success: false,
        message: 'delete failed',
        context: error.message,
      });
    }
  }

  @Get('/export/:id')
  async export(
    @Param('id') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const studentData = await this.diaryService.getDataReport(uuid);
    const html = fs.readFileSync(
      path.join(__dirname, '../../html/diaryTemplate.hbs'),
    );
    this.logger.debug(path.join(__dirname, '../../html/diaryTemplate.hbs'));
    const fileBuffer = await this.diaryService.generatePdf(
      html.toString(),
      studentData,
    );
    if (fileBuffer) {
      const file = new StreamableFile(fileBuffer);
      res.setHeader('Content-Disposition', `attachment; filename="pdf.pdf"`);
      res.setHeader('Content-Type', 'application/pdf');
      this.logger.log(`Get student information ${uuid}`);
      return file;
    }
    res.status(HttpStatus.BAD_REQUEST);
    return { success: false };
  }
}
