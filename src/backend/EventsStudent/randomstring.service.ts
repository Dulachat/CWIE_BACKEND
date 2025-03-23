/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class RandomStringService {
    
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const randomString = randomstring.generate({
      length,
      charset: characters,
    });

    return randomString;
  }
}
