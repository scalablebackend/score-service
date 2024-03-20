import { Router, Express } from "express";
import { ScoreController } from "./score.controller";
import { KafkaService } from "../common/services/kafka.service";

type GameEndEvent = {
  winner: string;
  board: string[];
};

export class ScoreModule {
  constructor(
    private controller: ScoreController,
    private kafkaService: KafkaService
  ) {}

  get routes() {
    const router = Router();

    router.get("/", (_, res) => {
      this.controller.handleGetScores(res);
    });

    return router;
  }

  configure(app: Express) {
    app.use("/score", this.routes);

    this.kafkaService.on("game.end", async (data: GameEndEvent) => {
      this.controller.onGameEnd(data.winner, data.board);
    });
  }
}
