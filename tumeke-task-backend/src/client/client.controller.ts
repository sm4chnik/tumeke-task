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
import { ClientService } from './client.service';
import { ClientWithNotes } from './client.types';
import { ClientFindAllQueryDto } from './dto/clientFindAllQuery.dto';
import { ClientUpdateBodyDto } from './dto/clientUpdateBody.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  @Inject() private readonly clientService: ClientService;

  @Get()
  async findAll(
    @Query() query: ClientFindAllQueryDto,
  ): Promise<ClientWithNotes[]> {
    return this.clientService.findAll(query);
  }

  @Get(':id')
  async find(@Param() params: IdParamDto): Promise<ClientWithNotes> {
    return this.clientService.find(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: ClientUpdateBodyDto): Promise<ClientWithNotes> {
    return this.clientService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: ClientUpdateBodyDto,
  ): Promise<ClientWithNotes> {
    return this.clientService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    await this.clientService.delete(params.id);
  }
}
