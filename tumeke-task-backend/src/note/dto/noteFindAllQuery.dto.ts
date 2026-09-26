import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/paginationQuery.dto';

export class NoteFindAllQueryDto extends PaginationQueryDto {
  /** Notes linked to this client through clientsHasNotes */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clientId: number;

  /** Notes linked to this user through usersHasNotes */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
