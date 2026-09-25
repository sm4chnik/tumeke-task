import {
  Prisma,
  clients as Client,
  clientsHasNotes as ClientsHasNotes,
  notes as Note,
} from '@prisma/client';
import { clientInclude } from './client.constants';

export type ClientWithNotes = Prisma.clientsGetPayload<{
  include: typeof clientInclude;
}>;

// Timestamps nested in json_agg come back as ISO strings, not Date
export type NoteRow = Omit<Note, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type ClientRow = Client & {
  clientsHasNotes: (ClientsHasNotes & { notes: NoteRow })[];
};
