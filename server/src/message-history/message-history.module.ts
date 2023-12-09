// src/message-history/message-history.module.ts

import { Module } from '@nestjs/common';
import { MessageHistoryService } from './message-history.service';
import { MessageHistoryGateway } from './message-history.gateway';

@Module({
  providers: [MessageHistoryService, MessageHistoryGateway],
  exports: [MessageHistoryService], 
})
export class MessageHistoryModule {}
