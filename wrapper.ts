import {Game} from "./src/Game";
import {Player} from "./src/Player";
import { Color } from "./src/Color";

export async function init (nbPlayers: number, expansions: string[], options: {}, seed?: string): Promise<Game> {
  const colors = [Color.BLUE, Color.RED, Color.YELLOW, Color.GREEN, Color.NEUTRAL, Color.BLACK];
  const players = new Array(nbPlayers).fill(0).map((x, i) => new Player(`Player ${i+1}`, colors[i], false));
  const game = new Game(seed, players, players[0]);

  return game;
}

function loadGameIfNeeded(G: Game | any) {
  if (G instanceof Game) {
    return G;
  }

  const player = new Player("test", Color.BLUE, false);
  const player2 = new Player("test2", Color.RED, false);

  const gameToRebuild = new Game(G.id , [player,player2], player);
  gameToRebuild.loadFromJSON(G);

  return gameToRebuild;
}

export function setPlayerMetaData(G: Game, player: number, metaData: {name: string}) {
  G = loadGameIfNeeded(G);
  G.players[player].name = metaData.name;

  return G;
}

export async function move(G: Game, move: any, player: number) {
  G = loadGameIfNeeded(G);

  G.players[player].process(G, move);

  return G;
}

export function ended(G: Game) {
  // TODO
  return false;
}

export function cancelled(G: Game) {
  return (G as any).cancelled;
}

export function toSave(G: Game) {
  return toSend(G);
}

export function toSend(G: Game) {
  if (G instanceof Game) {
    return JSON.stringify(G,G.replacer);
  }
  return G;
}

export function scores(G: Game) {
  G = loadGameIfNeeded(G);
  return G.players.map(pl => pl.getVictoryPoints(G));
}

export async function dropPlayer (G: Game, player: number) {
  (G as any).cancelled = true;
  return G;
}

export function logLength (G: Game) {
  return 0;
}

export function logSlice (G: Game, options?: {player?: number; start?: number; end?: number}) {
  return {state: toSend(G)};
}
