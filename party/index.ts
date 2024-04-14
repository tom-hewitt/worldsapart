import type * as Party from "partykit/server";
import { json } from "node:stream/consumers";

const randomId = () => Math.random().toString(36).substring(2, 10);

const NUM_PLAYERS = 1; //DEBUG
//const NUM_PLAYERS = 4;

export default class GameServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true,
    };
  constructor(readonly room: Party.Room) {}

    async onRequest(request: Party.Request) {
        if (request.method === "POST" && request.body) {
            const data = await request.json() as { type: string };
            const connections = Array.from(this.room.getConnections());
            const activePlanetIDs : string[] = await this.room.storage.get("activePlanetIDs") ?? [];
            if (data.type === "ALIVE-QUERY" && ((connections.length > 0) || (activePlanetIDs.length > 0))) {
                return new Response("OK", {status: 200});
            } else {
                return new Response("NOT ALIVE", {status: 400});
            }
        }
        return new Response("NOT FOUND", {status: 404});

    }


  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected To Game:
  id: ${conn.id}
  game: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

      let activePlanetIDs : string[] = await this.room.storage.get("activePlanetIDs") ?? [];
      let waitingIDs : string[] = await this.room.storage.get("waitingIDs") ?? [];
      const connections = Array.from(this.room.getConnections());

        // Add to waiting list
        waitingIDs.push(conn.id);

    // Send number of waiting connections
      const data = JSON.stringify({type:"WAIT", data: 4 - waitingIDs.length});
      for (const id of waitingIDs) {
          this.room.getConnection(id)!.send(data);
      }

    // Check how many waiting
    if (waitingIDs.length >= NUM_PLAYERS) {
        // Create a new planet
        const planetID = randomId();
        activePlanetIDs.push(planetID);
        this.room.storage.put("activePlanetIDs", activePlanetIDs);

        // Send the planet id to the first 4 connections
        for (let i = 0; i < 4; i++) {
            const data = JSON.stringify({type:"CONN", data: planetID});
            this.room.getConnection(waitingIDs[i])!.send(data);
        }

        // Remove connections from waiting list
        waitingIDs.splice(0, 4);
    }
    this.room.storage.put("waitingIDs", waitingIDs);
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

  async onClose(conn: Party.Connection) {
      let waitingIDs : string[] = await this.room.storage.get("waitingIDs") ?? [];
    // A websocket just disconnected!
    console.log(`Disconnected from Game: ${conn.id}`);

      waitingIDs.splice(waitingIDs.indexOf(conn.id), 1);

      // Send number of waiting connections
      const data = JSON.stringify({type:"WAIT", data: 4 - waitingIDs.length});
      for (const id of waitingIDs) {
          this.room.getConnection(id)!.send(data);
      }

      this.room.storage.put("waitingIDs", waitingIDs);

  }
}

GameServer satisfies Party.Worker;
