import type * as Party from "partykit/server";
import {json} from "node:stream/consumers";

const randomId = () => Math.random().toString(36).substring(2, 10);

export default class GameServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true,
    };

  private connections: Array<Party.Connection> = [];
  private activePlanetIDs: Array<String> = [];
  constructor(readonly room: Party.Room) {}

    async onRequest(request: Party.Request) {
        if (request.method === "POST" && request.body) {
            const data = await request.json() as {type: string};
            console.log(data.type);
            if (data.type === "ALIVE-QUERY" && (this.connections.length > 0) || (this.activePlanetIDs.length > 0)) {
                return new Response("OK", {status: 200});
            } else {
                return new Response("NOT ALIVE", {status: 400});
            }
        }
        return new Response("NOT FOUND", {status: 404});


    }


  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected To Game:
  id: ${conn.id}
  game: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // Add connection to list
    this.connections.push(conn);

    // Send number of waiting connections
    for (let i = 0; i < this.connections.length; i++) {
        const data = JSON.stringify({type:"WAIT", data: 4 - this.connections.length});
        this.connections[i].send(data);
    }

    // Check how many waiting
    if (this.connections.length >= 4) {
        // Create a new planet
        const planetID = randomId();
        this.activePlanetIDs.push(planetID);

        // Send the planet id to the first 4 connections
        for (let i = 0; i < 4; i++) {
            const data = JSON.stringify({type:"CONN", data: planetID});
            this.connections[i].send(data);
        }

        // Remove the first 4 connections
        this.connections = this.connections.slice(4);
    }
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

  onClose(conn: Party.Connection) {
    // A websocket just disconnected!
    console.log(`Disconnected from Game: ${conn.id}`);
    // Remove connection from list
    this.connections = this.connections.filter((c) => c !== conn);
  }
}

GameServer satisfies Party.Worker;
