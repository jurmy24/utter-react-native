import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class AudioService {
  // The folder where audio files will be stored
  private readonly audioStoragePath = 'uploads/audio';

  constructor() {
    this.initStorage();
  }

  private async initStorage(): Promise<void> {
    try {
      // Create the directory if it doesn't exist
      await mkdir(join(process.cwd(), this.audioStoragePath), { recursive: true });
      console.log('Audio storage directory initialized.');
    } catch (error) {
      console.error('Error initializing audio storage directory:', error);
      // You might want to handle this error further depending on your application's needs
    }
  }

  /**
   * Stores the received audio file and returns its path.
   *
   * @param file The audio file received in the request.
   * @returns The path or URL where the file is stored.
   */
  async storeFile(file: Express.Multer.File): Promise<string> {
    // Generate a unique file name
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = join(this.audioStoragePath, filename);

    // Write the file to the storage
    await writeFile(filePath, file.buffer);

    // Return the file path or URL
    return filePath;
  }

  // Additional methods related to audio processing can be added here
}
