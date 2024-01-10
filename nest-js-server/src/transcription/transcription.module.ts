// transcription.module.ts

import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionController } from './transcription.controller'; // Import the controller
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TranscriptionService],
  controllers: [TranscriptionController],
})
export class TranscriptionModule {}
