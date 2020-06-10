import {Game} from "./src/Game";
import {Player} from "./src/Player";
import { Color } from "./src/Color";

export async function init (nbPlayers: number, expansions: string[], options: {}, seed?: string): Promise<Game> {
  const colors = [Color.BLUE, Color.RED, Color.YELLOW, Color.GREEN, Color.NEUTRAL, Color.BLACK];
  const players = new Array(nbPlayers).fill(0).map((x, i) => new Player(`Player ${i+1}`, colors[i], false));
  const game = new Game(Math.random().toString(), players, players[0]);

  return game;
}
