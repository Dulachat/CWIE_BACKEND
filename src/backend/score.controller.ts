
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateScoreForm08Dto } from './dto/create-scoreForm08.dto';
import { ScoreService } from './score.service';
import { CreateScoreForm09Dto } from './dto/create-scoreForm09.dto';

@Controller('form')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) { }

    @Patch('form08/:student_id')
    createForm08(@Param('student_id') id:any, @Body() createScoreForm08Dto: CreateScoreForm08Dto) {
        return this.scoreService.createForm08(id,createScoreForm08Dto)
    }

    @Patch('form09/:student_id')
    createForm09(@Param('student_id') id:any, @Body() createScoreForm09Dto: CreateScoreForm09Dto) {
        return this.scoreService.createForm09(id,createScoreForm09Dto)
    }
}
