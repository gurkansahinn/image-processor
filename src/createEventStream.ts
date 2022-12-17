import { AMQPClient } from '@cloudamqp/amqp-client';
import { RabbitMqEventStream } from './eventStream/rabbitMqEventStream';
import { EventStream } from './eventStream/eventStream';
import logger from './logger';

export async function createEventStream(): Promise<EventStream> {
  const connectionUrl = process.env.RABBITMQ_HOST;

  if (!connectionUrl) {
    throw new Error('RABBITMQ_HOST is not defined');
  }

  const client = new AMQPClient(connectionUrl);
  const connection = await client.connect();
  const channel = await connection.channel();

  logger.info('🚀 RabbitMQ is connected');
  return new RabbitMqEventStream(channel);
}
