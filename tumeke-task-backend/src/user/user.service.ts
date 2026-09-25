import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { rethrowNotFound } from '../prisma/prisma.errors';
import { toPagination } from '../common/pagination';
import { userInclude } from './user.constants';
import { UserWithNotes } from './user.types';
import { UserFindAllQueryDto } from './dto/userFindAllQuery.dto';
import { UserUpdateBodyDto } from './dto/userUpdateBody.dto';

@Injectable()
export class UserService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(query: UserFindAllQueryDto): Promise<UserWithNotes[]> {
    return this.prisma.users.findMany({
      where: { deletedAt: null, clientId: query.clientId },
      include: userInclude,
      orderBy: { id: 'asc' },
      ...toPagination(query),
    });
  }

  async find(id: number): Promise<UserWithNotes> {
    const user = await this.prisma.users.findFirst({
      where: { id, deletedAt: null },
      include: userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(data: UserUpdateBodyDto): Promise<UserWithNotes> {
    await this.assertClientExists(data.clientId);
    return this.prisma.users.create({
      data: { name: data.name, clientId: data.clientId },
      include: userInclude,
    });
  }

  async update(id: number, data: UserUpdateBodyDto): Promise<UserWithNotes> {
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
