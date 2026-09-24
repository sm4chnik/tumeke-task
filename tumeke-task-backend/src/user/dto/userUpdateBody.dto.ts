import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserUpdateBodyDto {
  @IsString()
  @Type(() => String)
  name: string;

  @IsNumber()
  @Type(() => Number)
  clientId: number;
}
