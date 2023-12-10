import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class SpeechSynthesisService {
  private polly: AWS.Polly;

  constructor(private readonly httpService: HttpService) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.polly = new AWS.Polly();
  }

  async synthesizeSpeech(text: string, useOpenAI: boolean = false): Promise<Buffer> {
    if (useOpenAI) {
      return this.synthesizeWithOpenAI(text);
    } else {
      return this.synthesizeWithPolly(text);
    }
  }

  private async synthesizeWithPolly(text: string): Promise<Buffer> {
    const params: AWS.Polly.SynthesizeSpeechInput = {
      Text: text,
      OutputFormat: 'mp3',
      Engine: 'neural',
      VoiceId: 'Matthew',
    };

    try {
      const pollyResponse = await this.polly.synthesizeSpeech(params).promise();
      return pollyResponse.AudioStream as Buffer;
    } catch (error) {
      console.error('Error in synthesizeWithPolly:', error);
      throw error;
    }
  }

  private async synthesizeWithOpenAI(text: string): Promise<Buffer> {
    const requestBody = {
      model: 'tts-1-hd',
      input: text,
      voice: 'onyx',
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
      // return response.data.AudioStream as Buffer;
      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error in synthesizeWithOpenAI:', error);
      throw error;
    }
  }
}
