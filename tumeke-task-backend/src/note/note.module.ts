import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  providers: [NoteService],
  controllers: [NoteController],
  exports: [NoteService],
  imports: [PrismaModule],
})
export class NoteModule {}
