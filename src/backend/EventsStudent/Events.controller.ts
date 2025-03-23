import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from './Events.service';
import { CreateEventDto } from '../dto/create-events.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get('allEvents')
  findAll() {
    return this.eventService.findAll();
  }
  @Get('allEvents/Student')
  findAllEvent() {
    return this.eventService.findAllEventStudent();
  }
  @Get('allEvents/branch/:id')
  findBranchEvent(@Param('id') id: string) {
    return this.eventService.findBranchEvent(id);
  }

  @Get('getToken/:id')
  findToken(@Param() id: string) {
    return this.eventService.findToken(id);
  }

  @Get('findOneEvent/:id')
  findOne(@Param('id') id: any) {
    return this.eventService.findOne(id);
  }

  @Get('findStudentEvent/:id')
  findStudentEvent(@Param('id') id: any) {
    return this.eventService.findStudentEvent(id);
  }

  @Get('EventOfStudent/:eventID') // find by EventId
  findEventOfStudent(@Param('eventID') event_id: any) {
    return this.eventService.findEventOfStudent(event_id);
  }

  @Post('createEvent')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('enterToken')
  enterTokenEvent(@Body() enterToken: any) {
    return this.eventService.KeyToken(enterToken);
  }

  @Patch('updateEvent/:id')
  updateEvent(@Param() id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }
}
