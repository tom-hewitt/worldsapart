import { updatePlayer, randomPlanetSurfacePlacement } from "@/game/planet";
import type * as Party from "partykit/server";

const NAMES = [
  "Stardust",
  "Moonbeam",
  "Nebula",
  "Nova",
  "Eclipse",
  "Zephyr",
  "Serenade",
  "Comet",
  "Fusion",
  "Rhapsody",
  "Galaxy",
  "Orbit",
  "Celestia",
  "Astro",
  "Cosmo",
  "Gravity",
  "Solstice",
  "Voyager",
  "Radiance",
  "Infinity",
];

export type PlayerData = {
  id: string;
  name: string;
  inputDirection: [number, number, number];
  position: [number, number, number];
  quaternion: [number, number, number, number];
  inventory: string[];
};

export type ItemData = {
  name: "screwdriver" | "fuel";
  position: [number, number, number];
  quaternion: [number, number, number, number];
};

const TIME_STEP = 1000 / 60;

export const PLANET_RADIUS = 50;

export const ITEM_TYPES = ["screwdriver", "fuel"] as const;

export default class PlanetServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  players: { [id: string]: PlayerData } = {};

  items: { [id: string]: ItemData } = Object.fromEntries(
    Array.from({ length: 50 }).map((_, i) => [
      i.toString(),
      {
        // choose a random item
        name: ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)],
        ...randomPlanetSurfacePlacement(),
      },
    ])
  );

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
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      inputDirection: [0, 0, 0],
      ...randomPlanetSurfacePlacement(),
      inventory: [],
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

      for (const [id, item] of Object.entries(this.items)) {
        if (
          Math.hypot(
            item.position[0] - player.position[0],
            item.position[1] - player.position[1],
            item.position[2] - player.position[2]
          ) < 2
        ) {
          player.inventory.push(id);
          delete this.items[id];
        }
      }
    }

    this.room.broadcast(
      JSON.stringify({ players: this.players, items: this.items })
    );
  }
}

PlanetServer satisfies Party.Worker;
