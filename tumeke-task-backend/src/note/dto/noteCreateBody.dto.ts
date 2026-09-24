import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  @Type(() => Object)
  note: any;
}
