import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { rethrowNotFound } from '../prisma/prisma.errors';
import { toPagination } from '../common/pagination';
import {
  FINANCE_NOTE_TYPE,
  UNPAID_STATUS,
  clientInclude,
} from './client.constants';
import { ClientRow, ClientWithNotes } from './client.types';
import { ClientFindAllQueryDto } from './dto/clientFindAllQuery.dto';
import { ClientUpdateBodyDto } from './dto/clientUpdateBody.dto';

function toDate(value: string | null): Date | null {
  return value === null ? null : new Date(value);
}

function financeNoteExists(billCondition: Prisma.Sql): Prisma.Sql {
  return Prisma.sql`EXISTS (
    SELECT 1
    FROM "clientsHasNotes" chn
    JOIN notes n ON n.id = chn."noteId"
    WHERE chn."clientId" = c.id
      AND n."deletedAt" IS NULL
      AND n.note ->> 'type' = ${FINANCE_NOTE_TYPE}
      AND ${billCondition}
  )`;
}

@Injectable()
export class ClientService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(query: ClientFindAllQueryDto): Promise<ClientWithNotes[]> {
    const conditions: Prisma.Sql[] = [Prisma.sql`c."deletedAt" IS NULL`];
    if (query.hasUnpaid) {
      conditions.push(
        financeNoteExists(
          Prisma.sql`jsonb_path_exists(
            n.note,
            '$.bills[*] ? (@.status == $status)',
            jsonb_build_object('status', ${UNPAID_STATUS}::text)
          )`,
        ),
      );
    }
    if (query.billAmountLargerThan !== undefined) {
      conditions.push(
        financeNoteExists(
          Prisma.sql`jsonb_path_exists(
            n.note,
            '$.bills[*] ? (@.amount > $amount)',
            jsonb_build_object('amount', ${query.billAmountLargerThan}::numeric)
          )`,
        ),
      );
    }
    const { take, skip } = toPagination(query);

    const rows = await this.prisma.$queryRaw<ClientRow[]>`
      SELECT
        c.id,
        c.name,
        c."createdAt",
        c."updatedAt",
        c."deletedAt",
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', chn.id,
                'clientId', chn."clientId",
                'noteId', chn."noteId",
                'notes', to_json(n)
              )
              ORDER BY chn.id
            )
            FROM "clientsHasNotes" chn
            JOIN notes n ON n.id = chn."noteId"
            WHERE chn."clientId" = c.id AND n."deletedAt" IS NULL
          ),
          '[]'::json
        ) AS "clientsHasNotes"
      FROM clients c
      WHERE ${Prisma.join(conditions, ' AND ')}
      ORDER BY c.id
      LIMIT ${take}
      OFFSET ${skip}
    `;

    return rows.map((row) => ({
      ...row,
      clientsHasNotes: row.clientsHasNotes.map((link) => ({
        ...link,
        notes: {
          ...link.notes,
          createdAt: toDate(link.notes.createdAt),
          updatedAt: toDate(link.notes.updatedAt),
          deletedAt: toDate(link.notes.deletedAt),
        },
      })),
    }));
  }

  async find(id: number): Promise<ClientWithNotes> {
    const client = await this.prisma.clients.findFirst({
      where: { id, deletedAt: null },
      include: clientInclude,
    });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  async create(data: ClientUpdateBodyDto): Promise<ClientWithNotes> {
    return this.prisma.clients.create({
      data: { name: data.name },
      include: clientInclude,
    });
  }

  async update(
    id: number,
    data: ClientUpdateBodyDto,
  ): Promise<ClientWithNotes> {
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
