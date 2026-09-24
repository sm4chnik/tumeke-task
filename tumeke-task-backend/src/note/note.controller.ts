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
  notes as Note,
  clients as Client,
  users as User,
  clientsHasNotes as ClientsHasNotes,
  usersHasNotes as UsersHasNotes,
} from 'prisma/prisma-client';
import { NoteService } from './note.service';
import { NoteFindAllQueryDto } from './dto/noteFindAllQuery.dto';
import { NoteFindParamsDto } from './dto/noteFindParams.dto';
import { NoteCreateBodyDto } from './dto/noteCreateBody.dto';
import { NoteUpdateBodyDto } from './dto/noteUpdateBody.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  @Inject() private readonly noteService: NoteService;

  @Get()
  async findAll(@Query() query: NoteFindAllQueryDto): Promise<
    (Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    })[]
  > {
    return this.noteService.findAll(query);
  }

  @Get(':id')
  async find(@Param() params: NoteFindParamsDto): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    return this.noteService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: NoteCreateBodyDto): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    return this.noteService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: NoteFindParamsDto,
    @Body() body: NoteUpdateBodyDto,
  ): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    return this.noteService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: NoteFindParamsDto): Promise<void> {
    await this.noteService.delete(params.id);
  }
}
