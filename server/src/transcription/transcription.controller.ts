import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';


@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  /**
   * Endpoint to handle audio file uploads and transcribe them.
   * 
   * @param file The uploaded audio file.
   * @param response The response object.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndTranscribe(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    if (!file) {
      return response.status(400).json({ message: 'No audio file provided' });
    }

    try {
      console.log("This is the file: ", file)
      // Transcribe the audio file
      const transcription = await this.transcriptionService.transcribeAudio(file);
      console.log("Here's transcription: ", transcription);
      return response.status(200).json({ transcription });
    } catch (error) {
      if (error.response) {
        console.error('Error Data:', error.response.data);
        console.error('Error Status:', error.response.status);
      } else {
        console.error('Error:', error.message);
      }
      return response.status(500).json({ message: 'Error in transcription', error: error.message });
    }
    
  }
}
