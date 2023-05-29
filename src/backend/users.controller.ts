
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('allUsers')
    findAll() {
        return this.usersService.findAll();
    }

    @Get('getSelect/:id')
    findSelect(@Param('id') branch_id: string) {
        return this.usersService.findSelect(branch_id)
    }

    @Get('oneUsers/:id')
    findOne(@Param("id") id: number) {
        return this.usersService.findOne(id);
    }
    @Get('oneUsersByUid/:uuid')
    findOneByUID(@Param("uuid") uuid: string) {
        return this.usersService.findOneUUID(uuid);
    }

    @Post('createUsers')
    create(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.create(createUsersDto)
    }

    @Patch('updateUsers/:id')
    update(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(id, updateUsersDto)
    }

    @Delete('deleteUsers/:id')
    removeStudent(@Param('id') id: number) {
        return this.usersService.remove(id)
    }

}
