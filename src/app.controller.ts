import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uploads/:image')
  getImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
