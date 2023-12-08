import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AudioService } from './audio.service';
import { Response } from 'express';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  /**
   * Endpoint to handle audio file uploads.
   * 
   * @param file The uploaded audio file.
   * @param response The response object.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    if (!file) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'No file provided' });
    }

    try {
      const filePath = await this.audioService.storeFile(file);
      return response.status(HttpStatus.OK).json({ message: 'File uploaded successfully', path: filePath });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error uploading file', error: error.message });
    }
  }

  // Should add file validation to ensure only valid audio files are processed
  // Currently the controller sends responses directly. Depending on the structure, we might want to hendle them differently, like using DTOs or exception filters for standardizing error responses.
  // Could implement necessary security measures like authentication and authorization as needed for the application. 

  // Additional endpoints related to audio can be added here
}
