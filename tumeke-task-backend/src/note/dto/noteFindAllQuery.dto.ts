import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class NoteFindAllQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
