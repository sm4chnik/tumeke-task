import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/paginationQuery.dto';

export class ClientFindAllQueryDto extends PaginationQueryDto {
  /** Any non-zero value: client has a finance note with status "unpaid" */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hasUnpaid?: number;

  /** Client has a finance note with a bill amount greater than this */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  billAmountLargerThan?: number;
}
