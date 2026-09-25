import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/paginationQuery.dto';

export class NoteFindAllQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
