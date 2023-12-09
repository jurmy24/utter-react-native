import { Module } from '@nestjs/common';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { SpeechSynthesisController } from './speech-synthesis.controller';


@Module({
  providers: [SpeechSynthesisService],
  controllers: [SpeechSynthesisController],
})
export class SpeechSynthesisModule {}
