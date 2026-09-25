import { Prisma } from '@prisma/client';

export const userInclude = {
  usersHasNotes: {
    where: { notes: { deletedAt: null } },
    include: { notes: true },
  },
} satisfies Prisma.usersInclude;
