export class ScoreService {
  private scores: Array<{ winner: string; board: string[]; date: string }> = [];

  addScore(winner: string, board: string[]) {
    this.scores.push({ winner, board, date: new Date().toISOString() });
  }

  getScores() {
    return this.scores;
  }
}
