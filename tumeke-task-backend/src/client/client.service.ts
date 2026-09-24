import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  clients as Client,
  clientsHasNotes as ClientsHasNotes,
  notes as Note,
} from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { ClientFindAllQueryDto } from './dto/clientFindAllQuery.dto';
import { ClientUpdateBodyDto } from './dto/clientUpdateBody.dto';

@Injectable()
export class ClientService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(
    query: ClientFindAllQueryDto,
  ): Promise<
    (Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] })[]
  > {
    // findAll implementation
    throw new BadRequestException('findAll implementation missing');
  }

  async find(id: number): Promise<Client> {
    // find implementation
    throw new BadRequestException('find implementation missing');
  }

  async create(data: ClientUpdateBodyDto): Promise<Client> {
    // create implementation
    throw new BadRequestException('create implementation missing');
  }

  async update(id: number, data: ClientUpdateBodyDto): Promise<Client> {
    // update implementation
    throw new BadRequestException('update implementation missing');
  }

  async delete(id: number): Promise<void> {
    // delete implementation
    throw new BadRequestException('delete implementation missing');
  }
}
