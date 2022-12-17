import { iocContainer } from './ioc';
import { ServiceIdentifiers } from './serviceIdentifiers';
import { FileConverter } from './fileConverter/fileConverter';
import { WebpConverter } from './fileConverter/webp/webp';
import { config } from 'dotenv';
import { EventStream } from './eventStream/eventStream';
import { createEventStream } from './createEventStream';
import { ImageConvertToWebpEvent } from './eventTracker/imageConvertToWebpEvent';
import { createHttpServer } from './createHttpServer';
import { createStorage } from './createStorage';
import { Storage } from './storage/storage';
import { ImageProcessingController } from './transportation/controllers/imageProcessingController';
import { ImageProcessingContext } from './domain/imageProcessing';
import { ConverterService } from './domain/image-processing/convert';

config();

async function main() {
  const eventStream = await createEventStream();
  const storage = createStorage();

  iocContainer.bind<EventStream>(ServiceIdentifiers.EventStream).toConstantValue(eventStream);
  iocContainer.bind<FileConverter>(ServiceIdentifiers.WebpConverter).to(WebpConverter);
  iocContainer.bind<Storage>(ServiceIdentifiers.Storage).toConstantValue(storage);

  iocContainer.bind(ImageProcessingController).to(ImageProcessingController).inSingletonScope();
  iocContainer.bind(ImageProcessingContext).to(ImageProcessingContext).inSingletonScope();
  iocContainer.bind(ConverterService).to(ConverterService).inSingletonScope();
  
  iocContainer.bind(ImageConvertToWebpEvent).to(ImageConvertToWebpEvent) &&
    iocContainer.get(ImageConvertToWebpEvent).subscribe();

  createHttpServer();
}

void main();
