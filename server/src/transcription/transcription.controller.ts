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
    // Check if an audio file was sent properly
    if (!file) {
      return response.status(400).json({ message: 'No audio file provided' });
    }

    try {
      // Transcribe the audio file using the transcription service
      const transcription = await this.transcriptionService.transcribeAudio(file);

      return response.status(200).json({ transcription });

    } catch (error) {
      // Handle any errors that may have occurred
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
