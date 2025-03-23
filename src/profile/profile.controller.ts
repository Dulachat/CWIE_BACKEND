/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { unlink } from 'fs';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/upload/:uuid/:userType')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile',
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
  async uploadImg(
    @UploadedFile() file,
    @Body() body: any,
    @Param('uuid') uuid: string,
    @Param('userType') userType: string,
  ) {
    body.profile = `profile/${file.filename}`;
    body.userType = userType;
    body.uuid = uuid;
    await this.profileService.updateProfile(body);
    return {
      url: `${process.env.CWIE_API_URL}/profile/${file.filename}`,
      fileName: file.filename,
    };
  }

  @Patch('/update')
  async updateProfile(@Body() body: any, @Res() res) {
    try {
      await this.profileService.updateProfile(body);
      res.status(HttpStatus.OK).json({
        status: true,
        message: 'Profile updated successfullyF',
      });
    } catch (error) {}
  }

  @Get('/:image')
  getImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/profile' });
  }

  @Delete('remove/:image/:uuid/:userType')
  async deleteImg(
    @Param('image') image: string,
    @Param('uuid') uuid: string,
    @Param('userType') userType: string,
  ) {
    const imagePath = `./uploads/profile/${image}`;
    if (fs.existsSync(imagePath)) {
      try {
        await new Promise((resolve, reject) => {
          unlink(imagePath, async (err) => {
            if (err) {
              console.error('Error deleting image:', err);
              reject(err);
            } else {
              await this.profileService.removeImage(uuid, userType);
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

  @Post('test')
  async test(){
    return "test"
  }
}
