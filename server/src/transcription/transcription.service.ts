import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class TranscriptionService {
  private readonly openAiApiUrl = 'https://api.openai.com/v1/audio/transcriptions';
  private readonly openAiApiKey = process.env.OPENAI_API_KEY; // Set this in your environment

  constructor(private httpService: HttpService) {}

  /**
   * Transcribes the given audio file using OpenAI's Audio API.
   * 
   * @param file The audio file to transcribe.
   * @returns An Observable of the AxiosResponse.
   */
  transcribeAudio(file: Express.Multer.File): Observable<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    formData.append('model', 'whisper-1');

    const headers = {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${this.openAiApiKey}`
    };

    return this.httpService.post(this.openAiApiUrl, formData, { headers });
  }
}
