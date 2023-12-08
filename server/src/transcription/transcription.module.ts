import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TranscriptionService],
})
export class TranscriptionModule {}