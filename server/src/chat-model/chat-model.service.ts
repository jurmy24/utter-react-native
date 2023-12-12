// src/chat-model/chat-model.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatModelService {
  private readonly openAiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly openAiApiKey = process.env.OPENAI_API_KEY; // Ensure this is set in your environment variables

  constructor(private readonly httpService: HttpService) {}

  async getChatResponse(messages: any[]): Promise<string> {
    const requestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: messages,
    };

    try {
      const response: AxiosResponse = await firstValueFrom(this.httpService.post(
        this.openAiApiUrl,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openAiApiKey}`,
          }
        }
      ));

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      throw error;
    }
  }
}
