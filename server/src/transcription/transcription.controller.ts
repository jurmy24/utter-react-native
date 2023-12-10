import { Controller, Post, UseInterceptors, UploadedFile, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import { Response } from 'express';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  /**
   * Endpoint to handle audio file uploads and transcribe them.
   * 
   * @param file The uploaded audio file.
   * @param chatId The identifier of the chatbot involved in the transcription.
   * @param response The response object.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndTranscribe(
    @UploadedFile() file: Express.Multer.File, 
    @Body('deviceId') deviceId: string, // Added to receive deviceId from the request body
    @Body('chatId') chatId: string,      // Added to receive chatId from the request body
    @Res() response: Response
  ) {
    // TODO: Replace the @Body stuff above with the generic 'any' Body used in other controllers.
    // Check if an audio file was sent properly
    if (!file) {
      return response.status(400).json({ message: 'No audio file provided' });
    }

    try {
      // Transcribe the audio file using the transcription service
      // Pass the chatId to the service to handle language-specific transcription
      const transcription = await this.transcriptionService.transcribeAudio(file, chatId);

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
