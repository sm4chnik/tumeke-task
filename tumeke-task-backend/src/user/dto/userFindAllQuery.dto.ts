import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/paginationQuery.dto';

export class UserFindAllQueryDto extends PaginationQueryDto {
  /** Only users that belong to this client */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId: number;
}
