/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs';
import * as fs from 'fs';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('createCompany')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get('allCompany')
  findAll() {
    return this.companyService.findAll();
  }
  @Get('oneCompany/:id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Delete('deleteCompany/:id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }

  @Patch('updateCompany/:id')
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
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
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImg(@UploadedFile() file) {
    return {
      url: `${process.env.CWIE_API_URL}/company/companyImg/${file.filename}`,
      fileName: file.filename,
    };
  }

  @Get('companyImg/:image')
  getImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Delete('delete/:image')
  async deleteImg(@Param('image') image: string) {
    const imagePath = `./uploads/${image}`;
    if (fs.existsSync(imagePath)) {
      try {
        await new Promise((resolve, reject) => {
          unlink(imagePath, (err) => {
            if (err) {
              console.error('Error deleting image:', err);
              reject(err);
            } else {
              console.log('Image deleted successfully');
              return 200;
            }
          });
        });
      } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
    } else {
      return 404;
    }
  }
}
