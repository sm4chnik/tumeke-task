import { Prisma } from '@prisma/client';
import { userInclude } from './user.constants';

export type UserWithNotes = Prisma.usersGetPayload<{
  include: typeof userInclude;
}>;
