import { IsIn } from 'class-validator';

export const NOTE_TYPES = ['info', 'finance'] as const;
export type NoteType = (typeof NOTE_TYPES)[number];

// Fallback target for class-transformer when `type` matches no subtype,
// so that validation rejects unknown note types
export class NoteContentBaseDto {
  @IsIn(NOTE_TYPES)
  type: NoteType;
}
