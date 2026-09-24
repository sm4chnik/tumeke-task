import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class NoteFindParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
