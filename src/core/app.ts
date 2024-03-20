import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import { KafkaService } from "../common/services/kafka.service";
import { Config, ConfigService } from "../common/services/config.service";
import { ScoreModule } from "../score/score.module";
import { ScoreController } from "../score/score.controller";
import { ScoreService } from "../score/score.service";

async function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const config = new ConfigService();
  const kafka = new KafkaService(
    config.get(Config.KafkaGroupId),
    config.get(Config.KafkaClientId),
    config.get(Config.KafkaBroker)
  );

  const module = new ScoreModule(
    new ScoreController(new ScoreService()),
    kafka
  );

  module.configure(app);

  await kafka.init();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use((error: any, _req: Request, res: Response) => {
    console.log({ error, _req, res });
    return res.status(error.status || 500).json(error.body);
  });

  return app;
}

export default createApp;
