import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsEntity } from '../entities/Events.entity';
import { Repository } from 'typeorm';
import { EventStudent } from '../entities/EventStudent.entity';
import { CreateEventDto } from '../dto/create-events.dto';
import { EventTokenEntity } from '../entities/EventToken.entity';
import { UpdateEventDto } from '../dto/update-event.dto';
import { RandomStringService } from './randomstring.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private eventRepository: Repository<EventsEntity>,
    @InjectRepository(EventStudent)
    private eventStudentRepository: Repository<EventStudent>,
    @InjectRepository(EventTokenEntity)
    private eventTokenRepository: Repository<EventTokenEntity>,

    private readonly randomStringService: RandomStringService,
  ) {}

  findAll() {
    try {
      const findEvent = this.eventRepository.find({
        relations: ['Token', 'branchJoinEvent'],
        order: {
          id: 'desc',
        },
      });
      return findEvent;
    } catch (error) {
      throw error;
    }
  }
  async findAllEventStudent() {
    try {
      const findEvent = await this.eventRepository.find({
        order: {
          id: 'desc',
        },
        relations: ['Token.EventStudentList', 'Token.EventStudentList.student'],
      });

      return findEvent;
    } catch (error) {
      throw error;
    }
  }
  findOne(id: any) {
    try {
      const getOneEvent = this.eventRepository.findOne(id);
      return getOneEvent;
    } catch (error) {
      throw error;
    }
  }
  findEventOfStudent(event_id: string) {
    try {
      const getEventStudentList = this.eventStudentRepository.find({
        where: { eventId: event_id },
        relations: ['student'],
      });
      return getEventStudentList;
    } catch (error) {
      throw error;
    }
  }
  findBranchEvent(id: string) {
    try {
      const findEvent = this.eventRepository.find({
        relations: ['Token', 'branchJoinEvent'],
        where: {
          branch_id: id,
        },
        order: {
          id: 'desc',
        },
      });
      return findEvent;
    } catch (error) {
      throw error;
    }
  }

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const findEvent = await this.eventRepository.findOne({
        where: {
          title: createEventDto.title,
        },
      });
      if (findEvent !== null) {
        return {
          status: 201,
          message: 'Event Is have been created',
        };
      }
      if (findEvent === null) {
        const randomString = this.randomStringService.generateRandomString(10);
        const newEvents = new EventsEntity();
        newEvents.branch_id = createEventDto.branch_id;
        newEvents.secret_token = randomString;
        newEvents.title = createEventDto.title;
        newEvents.venue = createEventDto.venue;
        newEvents.level_event = createEventDto.level_event;
        newEvents.quota = createEventDto.quota;
        newEvents.year = createEventDto.year;
        newEvents.term = createEventDto.term;
        newEvents.start_date = createEventDto.start_date;
        newEvents.end_date = createEventDto.end_date;
        newEvents.start_time = createEventDto.start_time;
        newEvents.end_time = createEventDto.end_time;
        newEvents.hour_event = createEventDto.hour_event;
        newEvents.exdDate_token = createEventDto.exdDate_token;
        newEvents.exdTime_token = createEventDto.exdTime_token;
        const createEvent = await this.eventRepository.save(newEvents);
        for (let i = 0; i < createEventDto.quota; i++) {
          const randomString =
            this.randomStringService.generateRandomString(15);
          const newToken = new EventTokenEntity();
          newToken.Event = newEvents;
          newToken.Token = randomString;
          this.eventTokenRepository.save(newToken);
        }
        if (createEvent !== null) {
          return {
            status: 200,
            message: 'Success',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(value: any, updateEventDto: UpdateEventDto) {
    try {
      const findToken = await this.eventTokenRepository.find({
        where: {
          eventId: value.id,
        },
      });
      const findEvent = await this.eventRepository.findOne({
        where: {
          id: value.id,
        },
      });
      if (findToken.length !== updateEventDto.quota) {
        for (let i = findToken.length; i < updateEventDto.quota; i++) {
          const newToken = new EventTokenEntity();
          newToken.Event = findEvent;
          this.eventTokenRepository.save(newToken);
        }
      }
      const updateEvent = await this.eventRepository.update(
        value.id,
        updateEventDto,
      );
      if (updateEvent !== null) {
        return {
          status: 200,
          message: 'Success',
        };
      }
    } catch (error) {}
  }

  async findToken(data: any) {
    try {
      const tokenList = await this.eventTokenRepository.find({
        where: {
          eventId: data.id,
        },
      });
      return tokenList;
    } catch (error) {
      return error;
    }
  }

  async KeyToken(value: any) {
    try {
      const CheckEvent = await this.eventRepository.findOne({
        where: {
          secret_token: value.secret_token,
        },
      });
      const findToken = await this.eventTokenRepository.findOne({
        where: {
          Token: value.Token,
          eventId: CheckEvent.id,
        },
      });

      if (findToken !== null) {
        const checkToken = await this.eventStudentRepository.findOne({
          where: {
            tokenId: findToken.id,
          },
        });
        const checkRegister = await this.eventStudentRepository.findOne({
          where: {
            studentId: value.studentId,
            eventId: CheckEvent.id,
          },
        });
        if (checkRegister === null) {
          if (checkToken === null) {
            const newDate = new Date();
            const newTime = new Date();
            const exp_token = `${CheckEvent.exdDate_token} ${CheckEvent.exdTime_token}`;
            const mfd_token = `${newDate.toISOString().split('T')[0]} ${
              newTime.toTimeString().split('T')[0]
            }`; // today

            if (exp_token >= mfd_token) {
              // check date
              // check time
              const useToken: any = new EventStudent();
              useToken.eventId = CheckEvent.id;
              useToken.tokenId = findToken.id;
              useToken.studentId = value.studentId;
              const enterToken = await this.eventStudentRepository.save(
                useToken,
              );

              if (enterToken !== null) {
                return {
                  status: 200,
                  message: 'Success',
                };
              }
            } else {
              return {
                status: 201,
                message: 'token expired',
              };
            }
          } else {
            return {
              status: 202,
              message: 'Token already used',
            };
          }
        } else {
          return {
            status: 204,
            message: 'event have joined',
          };
        }
      } else {
        return {
          status: 203,
          message: 'event not matching',
        };
      }
    } catch (error) {
      return error;
    }
  }

  async findStudentEvent(id: number) {
    try {
      const event = await this.eventStudentRepository.find({
        where: {
          studentId: id,
        },
        relations: ['EventToken.Event'],
        order: {
          id: 'desc',
        },
      });
      return event;
    } catch (error) {
      return error;
    }
  }
}
