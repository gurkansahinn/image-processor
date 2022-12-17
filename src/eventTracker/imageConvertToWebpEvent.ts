import { provideSingleton } from '../util/decorators/provideSingleton';
import { EventStream } from '../eventStream/eventStream';
import { inject } from 'inversify';
import { ServiceIdentifiers } from '../serviceIdentifiers';
import { AMQPMessage } from '@cloudamqp/amqp-client';
import { messageToPayload } from '../eventStream/messageToPayload';
import { ImageConvertToWebpEventPayload } from './payload/ImageConvertToWebpEventPayload';
import { ConverterService } from '../domain/image-processing/convert';

@provideSingleton(ImageConvertToWebpEvent)
export class ImageConvertToWebpEvent {
  private readonly queueName = 'image.convertToWebp';

  private readonly eventStream: EventStream;

  private readonly converterService: ConverterService;

  constructor(
    @inject(ServiceIdentifiers.EventStream) eventStream: EventStream,
    @inject(ConverterService) converterService: ConverterService,
  ) {
    this.eventStream = eventStream;
    this.converterService = converterService;
  }

  subscribe(): void {
    this.eventStream.subscribe(this.queueName, this.handle.bind(this));
  }

  async handle(message: AMQPMessage): Promise<void> {
    const payload = messageToPayload<ImageConvertToWebpEventPayload>(message);

    await this.converterService.convertAndUpload(payload);

    await message.ack();
  }
}
