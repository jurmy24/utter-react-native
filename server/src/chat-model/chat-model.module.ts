// src/chat-model/chat-model.module.ts

import { Module } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { ChatModelController } from './chat-model.controller';
import { MessageHistoryService } from '../message-history/message-history.service';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  // ... other configurations
  imports: [HttpModule],
  providers: [ChatModelService, MessageHistoryService],
  controllers: [ChatModelController],
})
export class ChatModelModule {}
