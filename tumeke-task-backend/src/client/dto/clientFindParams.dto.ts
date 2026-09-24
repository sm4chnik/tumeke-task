import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ClientFindParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
