// src/chat-model/chat-model.module.ts

import { Module } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { ChatModelController } from './chat-model.controller';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { MessageHistoryModule } from 'src/message-history/message-history.module';

@Module({
  // ... other configurations
  imports: [HttpModule, MessageHistoryModule],
  providers: [ChatModelService],
  controllers: [ChatModelController],
})
export class ChatModelModule {}
