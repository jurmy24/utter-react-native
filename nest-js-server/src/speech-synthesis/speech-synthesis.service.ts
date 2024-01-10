import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class SpeechSynthesisService {
  private polly: AWS.Polly;
  private readonly frenchChatId = 'french-chatbot';
  private readonly englishChatId = 'english-chatbot';

  constructor(private readonly httpService: HttpService) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.polly = new AWS.Polly();
  }

  async synthesizeSpeech(text: string, chatbotId: string): Promise<Buffer> {
    if (chatbotId === this.frenchChatId) {
      return this.synthesizeWithPolly(text, 'Isabelle'); // Use 'Isabelle' voice for French
    } else if (chatbotId === this.englishChatId) {
      return this.synthesizeWithPolly(text, 'Matthew'); // Use 'onyx' voice for English
    } else {
      throw new Error('Invalid chatId');
    }
  }

  private async synthesizeWithPolly(text: string, voiceId: string): Promise<Buffer> {
    const params: AWS.Polly.SynthesizeSpeechInput = {
      Text: text,
      OutputFormat: 'mp3',
      Engine: 'neural',
      VoiceId: voiceId,
    };

    try {
      const pollyResponse = await this.polly.synthesizeSpeech(params).promise();
      return pollyResponse.AudioStream as Buffer;
    } catch (error) {
      console.error('Error in synthesizeWithPolly:', error);
      throw error;
    }
  }

  private async synthesizeWithOpenAI(text: string, voice: string): Promise<Buffer> {
    const requestBody = {
      model: 'tts-1',
      input: text,
      voice: voice,
    };

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post('https://api.openai.com/v1/audio/speech', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          responseType: 'arraybuffer',
        })
      );
      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error in synthesizeWithOpenAI:', error);
      throw error;
    }
  }
}
