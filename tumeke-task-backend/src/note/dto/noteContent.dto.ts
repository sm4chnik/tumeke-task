import { TypeOptions } from 'class-transformer';
import { FinanceNoteDto } from './financeNote.dto';
import { InfoNoteDto } from './infoNote.dto';

export { NoteContentBaseDto } from './noteContentBase.dto';

export type NoteContentDto = InfoNoteDto | FinanceNoteDto;

export const noteContentTypeOptions: TypeOptions = {
  discriminator: {
    property: 'type',
    subTypes: [
      { value: InfoNoteDto, name: 'info' },
      { value: FinanceNoteDto, name: 'finance' },
    ],
  },
  keepDiscriminatorProperty: true,
};
