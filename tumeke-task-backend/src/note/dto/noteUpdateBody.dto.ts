import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { FinanceNoteDto } from './financeNote.dto';
import { InfoNoteDto } from './infoNote.dto';
import {
  NoteContentBaseDto,
  NoteContentDto,
  noteContentApiProperty,
  noteContentTypeOptions,
} from './noteContent.dto';

@ApiExtraModels(InfoNoteDto, FinanceNoteDto)
export class NoteUpdateBodyDto {
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty(noteContentApiProperty)
  @IsObject()
  @ValidateNested()
  @Type(() => NoteContentBaseDto, noteContentTypeOptions)
  note: NoteContentDto;
}
