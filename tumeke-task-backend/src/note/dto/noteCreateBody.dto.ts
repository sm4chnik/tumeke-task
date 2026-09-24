import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  NoteContentBaseDto,
  NoteContentDto,
  noteContentTypeOptions,
} from './noteContent.dto';

export class NoteCreateBodyDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId?: number;

  @IsString()
  @Type(() => String)
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => NoteContentBaseDto, noteContentTypeOptions)
  note: NoteContentDto;
}
