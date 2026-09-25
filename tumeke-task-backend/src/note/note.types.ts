import { Prisma } from '@prisma/client';
import { noteInclude } from './note.constants';

export type NoteWithRelations = Prisma.notesGetPayload<{
  include: typeof noteInclude;
}>;
