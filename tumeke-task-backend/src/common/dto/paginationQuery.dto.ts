import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { MAX_PAGE_LIMIT } from '../constants';

export class PaginationQueryDto {
  /** Page size, 1–100. Default 20 */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_LIMIT)
  @Type(() => Number)
  limit?: number;

  /** Rows to skip. Default 0 */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
