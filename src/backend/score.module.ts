import { ScoreService } from './score.service';


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './score.controller';
import { FormInTP08 } from './entities/formintp08.entity';
import { FormInTP09 } from './entities/formintp09.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FormInTP08,FormInTP09,AssessmentDetail])],
    controllers: [ScoreController],
    providers: [
        ScoreService,],
})
export class ScoreModule { }
