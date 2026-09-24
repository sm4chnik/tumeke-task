import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [UserModule, ClientModule, NoteModule],
})
export class AppModule {}
