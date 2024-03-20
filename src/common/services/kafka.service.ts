import { Consumer, Kafka, Producer } from "kafkajs";

export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  private listeners: Array<{
    topic: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (data: any) => Promise<void>;
  }> = [];

  constructor(groupId: string, clientId: string, broker: string) {
    this.kafka = new Kafka({
      clientId: `${groupId}-${clientId}`,
      brokers: [broker],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId });
  }

  async init() {
    await this.producer.connect();

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const listeners = this.listeners.filter(
          (listener) => listener.topic === topic
        );

        await Promise.allSettled(
          listeners.map((listener) =>
            listener.callback(JSON.parse(message.value?.toString() ?? ""))
          )
        );
      },
    });
  }

  async on<T>(topic: string, callback: (data: T) => Promise<void>) {
    await this.consumer.subscribe({ topics: [topic] });
    this.listeners.push({ topic, callback });
  }
}
