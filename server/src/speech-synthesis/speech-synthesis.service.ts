import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SpeechSynthesisService {
  private polly: AWS.Polly;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.polly = new AWS.Polly();
  }

  async synthesizeText(text: string): Promise<Buffer> {
    const params: AWS.Polly.SynthesizeSpeechInput = {
      Text: text,
      OutputFormat: 'mp3',
      Engine: 'neural',
      VoiceId: 'Joanna',
    };

    try {
      const pollyResponse = await this.polly.synthesizeSpeech(params).promise();
      console.log("REACHED THE SERVICE");
      return pollyResponse.AudioStream as Buffer;
    } catch (error) {
      console.error('Error synthesizing text with Polly:', error);
      throw error;
    }
  }
}
