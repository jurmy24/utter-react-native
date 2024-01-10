import { Controller, Post, Body, Res } from '@nestjs/common';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { Response } from 'express';

@Controller('speech-synthesis')
export class SpeechSynthesisController {
  constructor(private readonly speechSynthesisService: SpeechSynthesisService) {}

  @Post('synthesize')
  async synthesize(@Body() body: any, @Res() res: Response) {
    try { 
      // Extract deviceId and chatbotId from the request body
      const { chatbotId, message } = body;

      const audioStream = await this.speechSynthesisService.synthesizeSpeech(message, chatbotId); // currently using openAI
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioStream.length,
      });
      res.send(audioStream);
    } catch (error) {
      res.status(500).send('Error synthesizing text');
    }
  }
}
