import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  users as User,
  notes as Note,
  usersHasNotes as UsersHasNotes,
} from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { UserFindAllQueryDto } from './dto/userFindAllQuery.dto';
import { UserUpdateBodyDto } from './dto/userUpdateBody.dto';

@Injectable()
export class UserService {
  @Inject() private readonly prisma: PrismaService;

  async findAll(
    query: UserFindAllQueryDto,
  ): Promise<
    (User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] })[]
  > {
    // findAll implementation
    throw new BadRequestException('findAll implementation missing');
  }

  async find(
    id: number,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    // find implementation
    throw new BadRequestException('find implementation missing');
  }

  async create(
    data: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    // create implementation
    throw new BadRequestException('create implementation missing');
  }

  async update(
    id: number,
    data: UserUpdateBodyDto,
  ): Promise<User & { usersHasNotes?: (UsersHasNotes & { notes: Note })[] }> {
    // update implementation
    throw new BadRequestException('update implementation missing');
  }

  async delete(id: number): Promise<void> {
    // delete implementation
    throw new BadRequestException('delete implementation missing');
  }
}
