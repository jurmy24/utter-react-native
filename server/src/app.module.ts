import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscriptionModule } from './transcription/transcription.module';
import { ChatModelModule } from './chat-model/chat-model.module';
import { MessageHistoryModule } from './message-history/message-history.module';
import { SpeechSynthesisModule } from './speech-synthesis/speech-synthesis.module';

@Module({
  imports: [TranscriptionModule, ChatModelModule, MessageHistoryModule, SpeechSynthesisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}