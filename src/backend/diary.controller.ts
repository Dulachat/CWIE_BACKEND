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
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';
import { PinoLogger } from 'util/logger';
import * as fs from 'fs';
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
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      storage: diskStorage({
        destination: path.join(process.cwd(), 'uploads'),
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) throw new Error('No file uploaded');
      return `${process.env.CWIE_API_URL}/Diary/uploads/${file.filename}`;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error processing file.');
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
  getImage(@Param('image') image: string, @Res() res: Response) {
    const root = path.join(process.cwd(), 'uploads');
    return res.sendFile(image, { root });
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
  async export(@Param('id') uuid: string, @Res() res: Response) {
    try {
      const studentData = await this.diaryService.getDataReport(uuid);
      const templatePath = path.join(__dirname, '../../html/diaryTemplate.hbs');
      const html = fs.readFileSync(templatePath, 'utf-8');
      const fileBuffer = await this.diaryService.generatePdf(
        html,
        studentData,
      );
      if (!fileBuffer) {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'PDF generation failed',
        });
        return;
      }
      res.setHeader(
        'Content-Disposition',
        `inline; filename="diary-${uuid}.pdf"`,
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', String(fileBuffer.length));
      res.setHeader('Cache-Control', 'no-cache, no-store');
      this.logger.log(`Export student diary ${uuid}`);
      res.end(fileBuffer);
    } catch (error) {
      this.logger.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error?.message || 'Export failed',
      });
    }
  }
}
