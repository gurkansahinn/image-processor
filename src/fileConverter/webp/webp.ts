import { FileConverter } from '../fileConverter';
import sharp from 'sharp';
import InvalidFileMetaError from '../errors/invalidFileMetaError';
import { inject, injectable } from 'inversify';
import { Storage } from '../../storage/storage';
import { ServiceIdentifiers } from '../../serviceIdentifiers';
import logger from '../../logger';

const ANIMATED_IMAGE_TYPES = ['gif', 'avif', 'webp'];

@injectable()
export class WebpConverter implements FileConverter {
  private readonly storage: Storage;

  constructor(@inject(ServiceIdentifiers.Storage) storage: Storage) {
    this.storage = storage;
  }

  async convert(path: string): Promise<string> {
    const content = await this.storage.getWithPath(path);
    logger.info(`Successfully downloaded file: ${path}`);

    const fileMetadata = await sharp(content).metadata();

    if (!fileMetadata || !fileMetadata.format) {
      throw new InvalidFileMetaError();
    }

    const convertedContent = await sharp(content, {
      animated: this.isAnimatedImageFormat(fileMetadata.format),
    })
      .webp()
      .toBuffer();

    await this.storage.delete(path);
    logger.info(`Successfully deleted file: ${path}`);

    const newFilePath = path.replace(/\.(\w+)$/, '.webp');

    await this.storage.upload(newFilePath, convertedContent);
    logger.info(`Successfully uploaded file: ${newFilePath}`);
    return newFilePath;
  }

  private isAnimatedImageFormat(fileFormat: string): boolean {
    return ANIMATED_IMAGE_TYPES.includes(fileFormat);
  }
}
