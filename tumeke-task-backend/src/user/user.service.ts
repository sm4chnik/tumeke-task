import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  users as User,
  notes as Note,
  usersHasNotes as UsersHasNotes,
} from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { rethrowNotFound } from '../prisma/prisma.errors';
import { UserFindAllQueryDto } from './dto/userFindAllQuery.dto';
import { UserUpdateBodyDto } from './dto/userUpdateBody.dto';

const userInclude = {
  usersHasNotes: {
    where: { notes: { deletedAt: null } },
    include: { notes: true },
  },
} satisfies Prisma.usersInclude;

@Injectable()
export class UserService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(
    query: UserFindAllQueryDto,
  ): Promise<
    (User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] })[]
  > {
    return this.prisma.users.findMany({
      where: { deletedAt: null, clientId: query.clientId },
      include: userInclude,
      orderBy: { id: 'asc' },
    });
  }

  async find(
    id: number,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    const user = await this.prisma.users.findFirst({
      where: { id, deletedAt: null },
      include: userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(
    data: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    await this.assertClientExists(data.clientId);
    return this.prisma.users.create({
      data: { name: data.name, clientId: data.clientId },
      include: userInclude,
    });
  }

  async update(
    id: number,
    data: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    await this.assertClientExists(data.clientId);
    return this.prisma.users
      .update({
        where: { id, deletedAt: null },
        data: {
          name: data.name,
          clientId: data.clientId,
          updatedAt: new Date(),
        },
        include: userInclude,
      })
      .catch(rethrowNotFound('User', id));
  }

  async delete(id: number): Promise<void> {
    const now = new Date();
    await this.prisma.users
      .update({
        where: { id, deletedAt: null },
        data: { deletedAt: now, updatedAt: now },
      })
      .catch(rethrowNotFound('User', id));
  }

  private async assertClientExists(clientId: number): Promise<void> {
    const client = await this.prisma.clients.findFirst({
      where: { id: clientId, deletedAt: null },
      select: { id: true },
    });
    if (!client) {
      throw new BadRequestException(`Client with id ${clientId} not found`);
    }
  }
}
