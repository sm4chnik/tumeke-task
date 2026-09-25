import { DEFAULT_PAGE_LIMIT } from './constants';
import { PaginationQueryDto } from './dto/paginationQuery.dto';

export type Pagination = {
  take: number;
  skip: number;
};

export function toPagination({
  limit,
  offset,
}: PaginationQueryDto): Pagination {
  return { take: limit ?? DEFAULT_PAGE_LIMIT, skip: offset ?? 0 };
}
