import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserFindParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
