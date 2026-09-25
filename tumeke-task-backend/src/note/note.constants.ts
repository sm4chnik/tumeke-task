import { Prisma } from '@prisma/client';

export const noteInclude = {
  usersHasNotes: {
    where: { users: { deletedAt: null } },
    include: { users: true },
  },
  clientsHasNotes: {
    where: { clients: { deletedAt: null } },
    include: { clients: true },
  },
} satisfies Prisma.notesInclude;
