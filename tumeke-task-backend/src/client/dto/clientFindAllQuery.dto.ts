import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ClientFindAllQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hasUnpaid?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  billAmountLargerThan?: number;
}
