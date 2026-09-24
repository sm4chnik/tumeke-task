import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import {
  NoteContentBaseDto,
  NoteContentDto,
  noteContentTypeOptions,
} from './noteContent.dto';

export class NoteUpdateBodyDto {
  @IsString()
  @Type(() => String)
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => NoteContentBaseDto, noteContentTypeOptions)
  note: NoteContentDto;
}
