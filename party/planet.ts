import type * as Party from "partykit/server";

type Player = {
  id: string;
  inputDirection: [number, number, number];
};

export default class PlanetServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  players: { [id: string]: Player } = {};

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected To Planet:
  id: ${conn.id}
  planet: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    conn.send("hello from server");

    this.players[conn.id] = {
      id: conn.id,
      inputDirection: [0, 0, 0],
    };
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
}

PlanetServer satisfies Party.Worker;
