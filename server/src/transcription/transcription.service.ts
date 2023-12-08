import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
const ffmpeg = require('fluent-ffmpeg');

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

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = 'uploads';
    const filePath = path.join(uploadDir, file.originalname);

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }

    // Save the file to disk
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  async convertAudio(inputPath, outputPath): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('mp3')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .save(outputPath);
    });
  }

  async convertAndTranscribe(file: Express.Multer.File): Promise<string> {
    try {
      // TODO: CHECK IF THE FILE FORMAT IS NOT ONE OF THOSE ACCEPTED BY OPENAI TO SAVE TIME
      const savedFilePath = await this.saveFile(file);
      const outputFilePath = savedFilePath.replace(path.extname(savedFilePath), '.mp3');

      await this.convertAudio(savedFilePath, outputFilePath);
      return outputFilePath;
    } catch (error) {
      console.error('Error in convertAndTranscribe:', error);
      throw error;
    }
  }

  async transcribeAudio(file: Express.Multer.File): Promise<string>  {
      // Convert the file to MP3
    const mp3FilePath = await this.convertAndTranscribe(file);

    // Now create FormData with the converted file
    const formData = new FormData();
    formData.append('file', fs.createReadStream(mp3FilePath));
    formData.append('model', 'whisper-1');


    const headers = {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${this.openAiApiKey}`
    };

    // // Transcribe the converted file
    // return firstValueFrom(this.httpService.post(this.openAiApiUrl, formData, { headers }));

    try {
      // Transcribe the converted file
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(this.openAiApiUrl, formData, { headers })
      );

      // Extract the text transcription from the response
      const transcriptionText = response.data.text;
      return transcriptionText; // This is the string format of the transcription
    } catch (error) {
      console.error('Error during transcription:', error);
      throw new Error('Error transcribing audio');
    }
  }
}
