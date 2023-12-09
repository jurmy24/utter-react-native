import { Controller, Post, Body, Res } from '@nestjs/common';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { Response } from 'express';

@Controller('speech-synthesis')
export class SpeechSynthesisController {
  constructor(private readonly speechSynthesisService: SpeechSynthesisService) {}

  @Post('synthesize')
  async synthesize(@Body('text') text: string, @Res() res: Response) {
    try {
      const audioStream = await this.speechSynthesisService.synthesizeText(text);
      console.log(audioStream);
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
