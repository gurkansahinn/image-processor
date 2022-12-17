import { ConvertAndUploadDto, ConverterService } from './image-processing/convert';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';

@provide(ImageProcessingContext)
export class ImageProcessingContext {
  private readonly imageProcessingConvert: ConverterService;

  constructor(@inject(ConverterService) converter: ConverterService) {
    this.imageProcessingConvert = converter;
  }

  async convert(data: ConvertAndUploadDto): Promise<string> {
    return this.imageProcessingConvert.convertAndUpload(data);
  }
}
