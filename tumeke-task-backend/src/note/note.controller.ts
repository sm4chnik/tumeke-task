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
import { NoteService } from './note.service';
import { NoteWithRelations } from './note.types';
import { NoteFindAllQueryDto } from './dto/noteFindAllQuery.dto';
import { NoteCreateBodyDto } from './dto/noteCreateBody.dto';
import { NoteUpdateBodyDto } from './dto/noteUpdateBody.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  @Inject() private readonly noteService: NoteService;

  @Get()
  async findAll(
    @Query() query: NoteFindAllQueryDto,
  ): Promise<NoteWithRelations[]> {
    return this.noteService.findAll(query);
  }

  @Get(':id')
  async find(@Param() params: IdParamDto): Promise<NoteWithRelations> {
    return this.noteService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: NoteCreateBodyDto): Promise<NoteWithRelations> {
    return this.noteService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: NoteUpdateBodyDto,
  ): Promise<NoteWithRelations> {
    return this.noteService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    await this.noteService.delete(params.id);
  }
}
