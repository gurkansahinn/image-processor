import { AMQPMessage } from '@cloudamqp/amqp-client';

export function messageToPayload<T>(message: AMQPMessage): T {
  const stringMessage = message.bodyToString();

  return JSON.parse(stringMessage || '{}');
}
