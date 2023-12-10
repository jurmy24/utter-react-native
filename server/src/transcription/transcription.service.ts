import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class TranscriptionService {
  private readonly openAiApiUrl = 'https://api.openai.com/v1/audio/transcriptions';
  private readonly openAiApiKey = process.env.OPENAI_API_KEY; // API key for OpenAI

  constructor(private httpService: HttpService) {}

  /**
   * Saves the received audio file to disk.
   * 
   * @param file The audio file received in the request.
   * @returns The file path where the audio file is saved.
   */
  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = 'uploads/audio'; // TODO: Perhaps put the audio file in a clientID directory?
    const filePath = path.join(uploadDir, file.originalname);

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }

    // Save the file to disk
    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  /**
   * Converts an audio file to MP3 format.
   * 
   * @param inputPath Path to the input file.
   * @param outputPath Path for the output MP3 file.
   * @returns A promise that resolves when conversion is complete.
   */
  async convert(inputPath, outputPath): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('mp3')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .save(outputPath);
    });
  }

  /**
   * Handles the conversion of an audio file to a format accepted by whisper.
   * 
   * @param file The audio file to be processed.
   * @returns The path to the converted MP3 file.
   */
  async convertAudioFile(file: Express.Multer.File): Promise<string> {
    try {
      const savedFilePath = await this.saveFile(file);
      const fileExtension = path.extname(savedFilePath).toLowerCase();
      const acceptedFormats = ['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm'];
  
      // Check if the file format is already accepted
      if (acceptedFormats.includes(fileExtension)) {
        return savedFilePath;
      } else {
        // Convert to MP3 if the format is not accepted
        const outputFilePath = savedFilePath.replace(fileExtension, '.mp3');
        await this.convert(savedFilePath, outputFilePath);
        return outputFilePath;
      }
    } catch (error) {
      console.error('Error in convertAudioFile:', error);
      throw error;
    }
  }
  

  /**
   * Transcribes an audio file using OpenAI's Audio API.
   * 
   * @param file The audio file to transcribe.
   * @param chatId The ID of the chatbot (to determine the language and prompt).
   * @returns The text transcription of the audio file.
   */
  async transcribeAudio(file: Express.Multer.File, chatId: string): Promise<string>  {
    try {
      const filePath = await this.convertAudioFile(file);

      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      formData.append('model', 'whisper-1');

      // Append a specific prompt based on the chatId
      let prompt = "Umm, let me think like, hmm... Okay, here's what I'm, like, thinking.";
      if (chatId === 'french-chatbot') {
        prompt = "Euh, laissez-moi réfléchir, hmm... D'accord, voici ce que je pense.";
      }
      formData.append('prompt', prompt);

      const headers = {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${this.openAiApiKey}`
      };

      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(this.openAiApiUrl, formData, { headers })
      );

      const transcriptionText = response.data.text;
      return transcriptionText; // Return the string format of the transcription
    } catch (error) {
      console.error('Error during transcription:', error);
      throw new Error('Error transcribing audio');
    }
  }
}
