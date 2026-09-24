import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserFindAllQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId: number;
}
