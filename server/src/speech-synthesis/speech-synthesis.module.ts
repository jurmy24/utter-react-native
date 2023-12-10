import { Module } from '@nestjs/common';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { SpeechSynthesisController } from './speech-synthesis.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SpeechSynthesisService],
  controllers: [SpeechSynthesisController],
})
export class SpeechSynthesisModule {}
