import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class NoteUpdateBodyDto {
  @IsString()
  @Type(() => String)
  name: string;

  @IsNumber()
  @Type(() => Object)
  note: any;
}
