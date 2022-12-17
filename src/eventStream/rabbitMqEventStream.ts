import { EventStream } from './eventStream';
import { injectable } from 'inversify';
import { AMQPChannel, AMQPMessage } from '@cloudamqp/amqp-client';
import logger from '../logger';

@injectable()
export class RabbitMqEventStream implements EventStream {
  private readonly channel: AMQPChannel;

  constructor(channel: AMQPChannel) {
    this.channel = channel;
  }

  async subscribe(queueName: string, func: (msg: AMQPMessage) => void): Promise<void> {
    const queue = await this.channel.queue(queueName);
    await queue.subscribe({ noAck: false }, func);
    logger.info(`RabbitMQ is subscribed to ${queueName}`);
  }
}
