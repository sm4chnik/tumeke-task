import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BillDto } from './note/dto/bill.dto';
import { FinanceNoteDto } from './note/dto/financeNote.dto';
import { InfoNoteDto } from './note/dto/infoNote.dto';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('TuMeKe task API')
    .setDescription(
      [
        'CRUD for users, clients and notes.',
        'Records are soft-deleted via `deletedAt` and excluded from every response.',
        '`GET /clients` filters bills inside the JSON `note` field (`hasUnpaid`, `billAmountLargerThan`).',
        'Every `findAll` accepts `limit` (1–100, default 20) and `offset`.',
      ].join(' '),
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [InfoNoteDto, FinanceNoteDto, BillDto],
  });
  SwaggerModule.setup('docs', app, document);
}
