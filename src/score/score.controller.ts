import { Response } from "express";
import { ScoreService } from "./score.service";

export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  onGameEnd(winner: string, board: string[]) {
    this.scoreService.addScore(winner, board);
  }

  handleGetScores(res: Response) {
    res.json(this.scoreService.getScores());
  }
}
