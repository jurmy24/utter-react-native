import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';
// import { SpeechSynthesisModule } from './speech-synthesis/speech-synthesis.module';
// import { TextProcessingModule } from './text-processing/text-processing.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { ChatModelModule } from './chat-model/chat-model.module';

@Module({
  imports: [AudioModule, TranscriptionModule, ChatModelModule], //SpeechSynthesisModule, TextProcessingModule, 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}