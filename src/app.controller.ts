import { Controller, Get, Param, Res } from '@nestjs/common';
import * as path from 'path';
import { existsSync } from 'fs';
import { AppService } from './app.service';

const UPLOADS_ROOT = './uploads';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploads/:image')
  getImage(@Param('image') image: string, @Res() res: any) {
    const filePath = path.join(UPLOADS_ROOT, image);
    if (!existsSync(filePath)) {
      return res.status(404).send('Not found');
    }
    return res.sendFile(image, { root: UPLOADS_ROOT });
  }
}
