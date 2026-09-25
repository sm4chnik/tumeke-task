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
import { IdParamDto } from '../common/dto/idParam.dto';
import { UserService } from './user.service';
import { UserWithNotes } from './user.types';
import { UserFindAllQueryDto } from './dto/userFindAllQuery.dto';
import { UserUpdateBodyDto } from './dto/userUpdateBody.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Inject() private readonly userService: UserService;

  @Get()
  async findAll(@Query() query: UserFindAllQueryDto): Promise<UserWithNotes[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async find(@Param() params: IdParamDto): Promise<UserWithNotes> {
    return this.userService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: UserUpdateBodyDto): Promise<UserWithNotes> {
    return this.userService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UserUpdateBodyDto,
  ): Promise<UserWithNotes> {
    return this.userService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    await this.userService.delete(params.id);
  }
}
