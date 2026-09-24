import { Type } from 'class-transformer';
import { IsArray, IsIn, ValidateNested } from 'class-validator';
import { BillDto } from './bill.dto';
import { NoteContentBaseDto } from './noteContentBase.dto';

export class FinanceNoteDto extends NoteContentBaseDto {
  @IsIn(['finance'])
  declare type: 'finance';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillDto)
  bills: BillDto[];
}
