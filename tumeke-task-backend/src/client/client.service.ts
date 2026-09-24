import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  clients as Client,
  clientsHasNotes as ClientsHasNotes,
  notes as Note,
} from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { rethrowNotFound } from '../prisma/prisma.errors';
import { ClientFindAllQueryDto } from './dto/clientFindAllQuery.dto';
import { ClientUpdateBodyDto } from './dto/clientUpdateBody.dto';

const clientInclude = {
  clientsHasNotes: {
    where: { notes: { deletedAt: null } },
    include: { notes: true },
  },
} satisfies Prisma.clientsInclude;

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

  async find(
    id: number,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    const client = await this.prisma.clients.findFirst({
      where: { id, deletedAt: null },
      include: clientInclude,
    });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  async create(
    data: ClientUpdateBodyDto,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    return this.prisma.clients.create({
      data: { name: data.name },
      include: clientInclude,
    });
  }

  async update(
    id: number,
    data: ClientUpdateBodyDto,
  ): Promise<
    Client & { clientsHasNotes?: (ClientsHasNotes & { notes: Note })[] }
  > {
    return this.prisma.clients
      .update({
        where: { id, deletedAt: null },
        data: { name: data.name, updatedAt: new Date() },
        include: clientInclude,
      })
      .catch(rethrowNotFound('Client', id));
  }

  async delete(id: number): Promise<void> {
    const now = new Date();
    await this.prisma.clients
      .update({
        where: { id, deletedAt: null },
        data: { deletedAt: now, updatedAt: now },
      })
      .catch(rethrowNotFound('Client', id));
  }
}
