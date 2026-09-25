import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/paginationQuery.dto';

export class ClientFindAllQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hasUnpaid?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  billAmountLargerThan?: number;
}
