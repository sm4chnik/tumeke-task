import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export const BILL_STATUSES = ['paid', 'unpaid'] as const;
export type BillStatus = (typeof BILL_STATUSES)[number];

export class BillDto {
  @IsString()
  date: string;

  @IsNumber()
  amount: number;

  @IsString()
  number: string;

  @IsIn(BILL_STATUSES)
  status: BillStatus;

  @IsOptional()
  @IsString()
  memo?: string;
}
