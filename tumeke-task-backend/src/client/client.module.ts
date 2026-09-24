import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
  imports: [PrismaModule],
})
export class ClientModule {}
