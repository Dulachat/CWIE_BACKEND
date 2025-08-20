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

  generateUsername(length = 10): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&*?';
    return randomstring.generate({ length, charset: characters });
  }

  generatePassword(length = 12): string {
    if (length < 8) {
      length = 8;
    }
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specials = '!@#$%^&*()-_=+[]{};:,.<>?';
    const all = lowercase + uppercase + digits + specials;

    const pick = (set: string) => set[Math.floor(Math.random() * set.length)];

    const requiredChars = [
      pick(lowercase),
      pick(uppercase),
      pick(digits),
      pick(specials),
    ];

    const remainingLength = length - requiredChars.length;
    const remainingChars = randomstring.generate({ length: remainingLength, charset: all }).split('');

    const passwordArray = requiredChars.concat(remainingChars);

    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = passwordArray[i];
      passwordArray[i] = passwordArray[j];
      passwordArray[j] = temp;
    }

    return passwordArray.join('');
  }
}
