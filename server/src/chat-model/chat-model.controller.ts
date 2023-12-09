// src/chat-model/chat-model.controller.ts

import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { MessageHistoryService } from '../message-history/message-history.service';
import { Response } from 'express';

@Controller('chat-model')
export class ChatModelController {
  constructor(
    private readonly chatModelService: ChatModelService,
    private readonly messageHistoryService: MessageHistoryService
  ) {}

  @Post('submit')
  async submitMessage(@Body() body: any, @Res() response: Response) {
    try {
      console.log("We haveth received a request!", body.message);
      
      // Format the new user message
      const userMessage = {
        role: "user",
        content: body.message
      };

      // Append the new message to history
      this.messageHistoryService.appendToHistory(userMessage);

      // Get and format the updated history for the chat model
      const history = this.messageHistoryService.getHistory().map(msg => ({
        role: msg.role, // Assuming sender is either 'user' or 'assistant'
        content: msg.content
      }));

      console.log("We appear to have some history: ", history);

      // Use the entire history for the chat response
      const chatResponse = await this.chatModelService.getChatResponse(history);

      console.log("Ahh, looketh, a reponse! ", chatResponse);

      // Format and append the assistant's response to history
      const assistantMessage = {
        role: "assistant",
        content: chatResponse
      };

      this.messageHistoryService.appendToHistory(assistantMessage);

      return response.status(200).json({ message: chatResponse });
    } catch (error) {
      return response.status(500).json({ error: 'Error processing request' });
    }
  }
}
