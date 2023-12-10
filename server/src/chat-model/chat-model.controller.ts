// Import necessary modules and services
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { MessageHistoryService } from '../message-history/message-history.service';
import { Response } from 'express';

// Define the controller with the route 'chat-model'
@Controller('chat-model')
export class ChatModelController {
  // Inject the ChatModelService and MessageHistoryService
  constructor(
    private readonly chatModelService: ChatModelService,
    private readonly messageHistoryService: MessageHistoryService
  ) {}

  // Define the POST method for the 'submit' route
  @Post('submit')
  async submitMessage(@Body() body: any, @Res() response: Response) {
    try {
      
      // Extract deviceId and chatbotId from the request body
      const { deviceId, chatbotId, message } = body;

      // Format the new user message
      const userMessage = {
        role: "user",
        content: message
      };

      // Log the User message for debugging
      console.log("User:", userMessage.content)

      // Append the user's message to the conversation history
      this.messageHistoryService.appendToHistory(deviceId, chatbotId, userMessage);

      // Retrieve and reformat the conversation history for the chat model
      const history = this.messageHistoryService.getHistory(deviceId, chatbotId)
        .map(msg => ({ role: msg.role, content: msg.content }));

      // Get the AI chat model's response based on the entire conversation history
      const chatResponse = await this.chatModelService.getChatResponse(history);

      // Format the assistant's response
      const assistantMessage = {
        role: "assistant",
        content: chatResponse // The response generated by the AI model
      };

      // Log the chat response for debugging
      console.log("Assistant: ", assistantMessage.content);

      // Add the assistant's response to history
      this.messageHistoryService.appendToHistory(deviceId, chatbotId, assistantMessage);

      // Send the chat model's response back to the client
      return response.status(200).json({ message: chatResponse });
    } catch (error) {
      // Handle any errors that occur during processing
      return response.status(500).json({ error: 'Error processing request' });
    }
  }
}
