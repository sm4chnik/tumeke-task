import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  notes as Note,
  clients as Client,
  users as User,
  clientsHasNotes as ClientsHasNotes,
  usersHasNotes as UsersHasNotes,
} from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { NoteFindAllQueryDto } from './dto/noteFindAllQuery.dto';
import { NoteCreateBodyDto } from './dto/noteCreateBody.dto';
import { NoteUpdateBodyDto } from './dto/noteUpdateBody.dto';

@Injectable()
export class NoteService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(query: NoteFindAllQueryDto): Promise<
    (Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    })[]
  > {
    // findAll implementation
    throw new BadRequestException('findAll implementation missing');
  }

  async find(id: number): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    // find implementation
    throw new BadRequestException('find implementation missing');
  }

  async create(data: NoteCreateBodyDto): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    // create implementation
    throw new BadRequestException('create implementation missing');
  }

  async update(
    id: number,
    data: NoteUpdateBodyDto,
  ): Promise<
    Note & {
      usersHasNotes?: (UsersHasNotes & { users: User })[];
      clientsHasNotes?: (ClientsHasNotes & { clients: Client })[];
    }
  > {
    // update implementation
    throw new BadRequestException('update implementation missing');
  }

  async delete(id: number): Promise<void> {
    // delete implementation
    throw new BadRequestException('delete implementation missing');
  }
}
