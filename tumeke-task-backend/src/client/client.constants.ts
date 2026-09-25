import { Prisma } from '@prisma/client';
import { BillStatus } from '../note/dto/bill.dto';
import { NoteType } from '../note/dto/noteContentBase.dto';

export const clientInclude = {
  clientsHasNotes: {
    where: { notes: { deletedAt: null } },
    include: { notes: true },
  },
} satisfies Prisma.clientsInclude;

export const UNPAID_STATUS: BillStatus = 'unpaid';
export const FINANCE_NOTE_TYPE: NoteType = 'finance';
