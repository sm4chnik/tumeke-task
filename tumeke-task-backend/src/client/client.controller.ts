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
  clients as Client,
  notes as Note,
  clientsHasNotes as ClientsHasNotes,
} from 'prisma/prisma-client';
import { ClientService } from './client.service';
import { ClientFindAllQueryDto } from './dto/clientFindAllQuery.dto';
import { ClientFindParamsDto } from './dto/clientFindParams.dto';
import { ClientUpdateBodyDto } from './dto/clientUpdateBody.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  @Inject() private readonly clientService: ClientService;

  @Get()
  async findAll(
    @Query() query: ClientFindAllQueryDto,
  ): Promise<
    (Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] })[]
  > {
    return this.clientService.findAll(query);
  }

  @Get(':id')
  async find(
    @Param() params: ClientFindParamsDto,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    return this.clientService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: ClientUpdateBodyDto,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    return this.clientService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: ClientFindParamsDto,
    @Body() body: ClientUpdateBodyDto,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    return this.clientService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: ClientFindParamsDto): Promise<void> {
    return this.clientService.delete(params.id);
  }
}
