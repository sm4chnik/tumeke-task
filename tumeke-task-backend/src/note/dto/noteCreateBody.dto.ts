import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FinanceNoteDto } from './financeNote.dto';
import { InfoNoteDto } from './infoNote.dto';
import {
  NoteContentBaseDto,
  NoteContentDto,
  noteContentApiProperty,
  noteContentTypeOptions,
} from './noteContent.dto';

@ApiExtraModels(InfoNoteDto, FinanceNoteDto)
export class NoteCreateBodyDto {
  /** At least one of userId / clientId is required; both may be given */
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId?: number;

  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty(noteContentApiProperty)
  @IsObject()
  @ValidateNested()
  @Type(() => NoteContentBaseDto, noteContentTypeOptions)
  note: NoteContentDto;
}
