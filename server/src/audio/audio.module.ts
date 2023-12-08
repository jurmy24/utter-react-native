import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';

@Module({
  controllers: [AudioController], // Include this only if you have an AudioController
  providers: [AudioService],
  exports: [AudioService] // Export AudioService if it will be used outside this module
})
export class AudioModule {}

