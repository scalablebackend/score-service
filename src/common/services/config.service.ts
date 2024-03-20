import dotenv from "dotenv";

export enum Config {
  KafkaClientId = "KAFKA_CLIENT_ID",
  KafkaBroker = "KAFKA_BROKER",
  KafkaGroupId = "KAFKA_GROUP_ID",
}

export class ConfigService {
  constructor() {
    dotenv.config({
      path: ".env",
    });
  }

  public get(key: Config) {
    return process.env[key] as string;
  }

  public getNumber(key: Config) {
    return parseInt(this.get(key));
  }
}
