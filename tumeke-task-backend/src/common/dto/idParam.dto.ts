import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
