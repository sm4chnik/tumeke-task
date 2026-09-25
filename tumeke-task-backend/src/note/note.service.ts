import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { rethrowNotFound } from '../prisma/prisma.errors';
import { toPagination } from '../common/pagination';
import { noteInclude } from './note.constants';
import { NoteWithRelations } from './note.types';
import { NoteFindAllQueryDto } from './dto/noteFindAllQuery.dto';
import { NoteCreateBodyDto } from './dto/noteCreateBody.dto';
import { NoteUpdateBodyDto } from './dto/noteUpdateBody.dto';
import { NoteContentDto } from './dto/noteContent.dto';

function toNoteJson(note: NoteContentDto): Prisma.InputJsonObject {
  if (note.type === 'info') {
    return { type: note.type, text: note.text };
  }
  return {
    type: note.type,
    bills: note.bills.map(({ date, amount, number, status, memo }) => ({
      date,
      amount,
      number,
      status,
      memo,
    })),
  };
}

@Injectable()
export class NoteService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(query: NoteFindAllQueryDto): Promise<NoteWithRelations[]> {
    return this.prisma.notes.findMany({
      where: {
        deletedAt: null,
        usersHasNotes:
          query.userId === undefined
            ? undefined
            : { some: { userId: query.userId, users: { deletedAt: null } } },
        clientsHasNotes:
          query.clientId === undefined
            ? undefined
            : {
                some: {
                  clientId: query.clientId,
                  clients: { deletedAt: null },
                },
              },
      },
      include: noteInclude,
      orderBy: { id: 'asc' },
      ...toPagination(query),
    });
  }

  async find(id: number): Promise<NoteWithRelations> {
    const note = await this.prisma.notes.findFirst({
      where: { id, deletedAt: null },
      include: noteInclude,
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async create(data: NoteCreateBodyDto): Promise<NoteWithRelations> {
    const { userId, clientId } = data;
    if (userId === undefined && clientId === undefined) {
      throw new BadRequestException('Either userId or clientId is required');
    }

    return this.prisma.$transaction(async (tx) => {
      if (userId !== undefined) {
        const user = await tx.users.findFirst({
          where: { id: userId, deletedAt: null },
          select: { id: true },
        });
        if (!user) {
          throw new BadRequestException(`User with id ${userId} not found`);
        }
      }
      if (clientId !== undefined) {
        const client = await tx.clients.findFirst({
          where: { id: clientId, deletedAt: null },
          select: { id: true },
        });
        if (!client) {
          throw new BadRequestException(`Client with id ${clientId} not found`);
        }
      }

      const note = await tx.notes.create({
        data: { name: data.name, note: toNoteJson(data.note) },
      });
      if (userId !== undefined) {
        await tx.usersHasNotes.create({ data: { userId, noteId: note.id } });
      }
      if (clientId !== undefined) {
        await tx.clientsHasNotes.create({
          data: { clientId, noteId: note.id },
        });
      }

      return tx.notes.findUniqueOrThrow({
        where: { id: note.id },
        include: noteInclude,
      });
    });
  }

  async update(
    id: number,
    data: NoteUpdateBodyDto,
  ): Promise<NoteWithRelations> {
    return this.prisma.notes
      .update({
        where: { id, deletedAt: null },
        data: {
          name: data.name,
          note: toNoteJson(data.note),
          updatedAt: new Date(),
        },
        include: noteInclude,
      })
      .catch(rethrowNotFound('Note', id));
  }

  async delete(id: number): Promise<void> {
    const now = new Date();
    await this.prisma.notes
      .update({
        where: { id, deletedAt: null },
        data: { deletedAt: now, updatedAt: now },
      })
      .catch(rethrowNotFound('Note', id));
  }
}
