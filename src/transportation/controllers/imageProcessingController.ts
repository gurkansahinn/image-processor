import { Body, Controller, Post, Route, Tags, Res } from 'tsoa';
import { provideSingleton } from '../../util/decorators/provideSingleton';
import { inject } from 'inversify';
import { ImageProcessingContext } from '../../domain/imageProcessing';
import { ConvertAndUploadDto } from '../../domain/image-processing/convert';
import { TsoaResponse } from '@tsoa/runtime';

interface ValidateError {
  message: string;
}

@Route('image-processing')
@Tags('ImageProcessing')
@provideSingleton(ImageProcessingController)
export class ImageProcessingController extends Controller {
  private readonly imageProcessingContext: ImageProcessingContext;

  constructor(@inject(ImageProcessingContext) imageProcessingContext: ImageProcessingContext) {
    super();

    this.imageProcessingContext = imageProcessingContext;
  }

  @Post('convert')
  public async convertAndUpload(
    @Body() data: ConvertAndUploadDto,
    @Res() response: TsoaResponse<204, { path: string }>,
    @Res() validationError: TsoaResponse<422, ValidateError>,
  ): Promise<void> {
    try {
      const path = await this.imageProcessingContext.convert(data);

      return response(204, { path });
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }

      return validationError(422, { message: e.message });
    }
  }
}
