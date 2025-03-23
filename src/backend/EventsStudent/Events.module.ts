import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './Events.controller';

import { EventsService } from './Events.service';
import { EventsEntity } from '../entities/Events.entity';
import { EventStudent } from '../entities/EventStudent.entity';
import { EventTokenEntity } from '../entities/EventToken.entity';
import { RandomStringService } from './randomstring.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity,EventStudent,EventTokenEntity])],
  providers: [EventsService,RandomStringService],
  controllers: [EventsController]
})
export class EventsModule { }
