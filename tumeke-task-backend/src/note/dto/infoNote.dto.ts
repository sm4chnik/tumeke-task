import { IsIn, IsString } from 'class-validator';
import { NoteContentBaseDto } from './noteContentBase.dto';

export class InfoNoteDto extends NoteContentBaseDto {
  @IsIn(['info'])
  declare type: 'info';

  @IsString()
  text: string;
}
