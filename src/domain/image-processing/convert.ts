import { FileConverter } from '../../fileConverter/fileConverter';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';
import { ServiceIdentifiers } from '../../serviceIdentifiers';
import logger from '../../logger';

export interface ConvertAndUploadDto {
  path: string;
}

@provide(ConverterService)
export class ConverterService {
  private readonly converter: FileConverter;

  constructor(@inject(ServiceIdentifiers.WebpConverter) converter: FileConverter) {
    this.converter = converter;
  }

  async convertAndUpload({ path }: ConvertAndUploadDto): Promise<string> {
    try {
      logger.info(`Converting file: ${path}`);
      const newPath = await this.converter.convert(path);
      return newPath;
    } catch (e) {
      logger.error(`Failed to convert file: ${path}. Error: ${e}`);
      throw e;
    }
  }
}
