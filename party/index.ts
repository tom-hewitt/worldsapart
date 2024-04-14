import type * as Party from "partykit/server";

const randomId = () => Math.random().toString(36).substring(2, 10);

export default class GameServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected To Game:
  id: ${conn.id}
  game: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // send the planet id
    conn.send(randomId());
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    );
  }
}

GameServer satisfies Party.Worker;
