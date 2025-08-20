import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }

  @Post('login')
  async login(
    @Body() body: { pwd: string, type: string, username: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    // login verification username and compare password

    if (body.type === 'company') {
      console.log(body.username)
      const user = await this.usersService.findAuthAssessment(body.username);
      console.log(user)
      if (!user) {
        throw new BadRequestException('invalid username');
      }
      if (!(await bcrypt.compare(body.pwd, user.pwd))) {
        throw new BadRequestException('invalid password');
      }
      const jwt = await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      });
      response.cookie('jwt', jwt, { httpOnly: true, expires: new Date() });
      const data = await this.jwtService.verifyAsync(jwt);
      if (!data) {
        throw new UnauthorizedException();
      }

      const { pwd, ...result } = user;

      return result;

    } else {
      const user = await this.authService.findAuth({ username: body.username });
      if (!user) {
        throw new BadRequestException('invalid username');
      }
      if (!(await bcrypt.compare(body.pwd, user.pwd))) {
        throw new BadRequestException('invalid password');
      }
      const jwt = await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      });
      response.cookie('jwt', jwt, { httpOnly: true, expires: new Date() });
      const data = await this.jwtService.verifyAsync(jwt);
      if (!data) {
        throw new UnauthorizedException();
      }
      const userData = await this.authService.findOne({
        id: data['id'],
        username: data['username'],
      });
      const { pwd, ...result } = userData;

      return result;
    }

  }

  @Post('verified-password')
  async verifiedPassword(
    @Body('username') username: string,
    @Body('email') email: string,
  ) {
    return this.authService.verifiedPassword(username, email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('password') newPassword: string,
    @Body('token') token: string,
    @Body('uuid') uuid: string,
    @Body('type') type: string,
  ) {
    return this.authService.resetPassword(newPassword, token, uuid, type);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', { path: '/' });
    return { data: 'success' };
  }
}
