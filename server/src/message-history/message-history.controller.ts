// src/message-history/message-history.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { MessageHistoryService } from './message-history.service';
import { Response } from 'express';

@Controller('message-history')
export class MessageHistoryController {
  constructor(private readonly messageHistoryService: MessageHistoryService) {}

  @Get('latest')
  async getLatestMessages(@Query('deviceId') deviceId: string, @Query('chatbotId') chatbotId: string, @Res() res: Response) {
    try {
      const history = this.messageHistoryService.getHistory(deviceId, chatbotId).filter(msg => msg.role !== 'system');
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving message history', error });
    }
  }
}