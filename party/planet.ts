import { updatePlayer } from "@/game/planet";
import type * as Party from "partykit/server";

export type PlayerData = {
  id: string;
  inputDirection: [number, number, number];
  position: [number, number, number];
  quaternion: [number, number, number, number];
};

const TIME_STEP = 1000 / 60;

export const PLANET_RADIUS = 50;

export default class PlanetServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  players: { [id: string]: PlayerData } = {};

  updateInterval: NodeJS.Timeout | null = null;

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected To Planet:
  id: ${conn.id}
  planet: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    this.players[conn.id] = {
      id: conn.id,
      inputDirection: [0, 0, 0],
      position: [0, 20, 0],
      quaternion: [0, 0, 0, 1],
    };

    if (Object.keys(this.players).length === 1) {
      this.startUpdateLoop();
    }
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);

    const messageJSON = JSON.parse(message);

    if (messageJSON.inputDirection) {
      const player = this.players[sender.id];

      player!.inputDirection = messageJSON.inputDirection;

      console.log(player);
    }
  }

  onClose(conn: Party.Connection) {
    console.log(`connection ${conn.id} closed`);

    delete this.players[conn.id];

    if (Object.keys(this.players).length === 0) {
      clearInterval(this.updateInterval!);
    }
  }

  startUpdateLoop() {
    this.updateInterval = setInterval(() => {
      this.update();
    }, TIME_STEP);
  }

  update() {
    for (const [id, player] of Object.entries(this.players)) {
      const { position, quaternion } = updatePlayer(
        player,
        TIME_STEP / 1000,
        player.inputDirection,
        PLANET_RADIUS
      );

      player.position = position;
      player.quaternion = quaternion;
    }

    this.room.broadcast(JSON.stringify(this.players));
  }
}

PlanetServer satisfies Party.Worker;
