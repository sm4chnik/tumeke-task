import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ClientUpdateBodyDto {
  @IsString()
  @Type(() => String)
  name: string;
}
