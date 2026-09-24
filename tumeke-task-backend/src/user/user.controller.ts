import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  users as User,
  notes as Note,
  usersHasNotes as UsersHasNotes,
} from 'prisma/prisma-client';
import { UserService } from './user.service';
import { UserFindAllQueryDto } from './dto/userFindAllQuery.dto';
import { UserFindParamsDto } from './dto/userFindParams.dto';
import { UserUpdateBodyDto } from './dto/userUpdateBody.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Inject() private readonly userService: UserService;

  @Get()
  async findAll(
    @Query() query: UserFindAllQueryDto,
  ): Promise<
    (User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] })[]
  > {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async find(
    @Param() params: UserFindParamsDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    return this.userService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    return this.userService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: UserFindParamsDto,
    @Body() body: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    return this.userService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: UserFindParamsDto): Promise<void> {
    await this.userService.delete(params.id);
  }
}
