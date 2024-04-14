"use client";

import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePartySocket } from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { Player } from "./Player";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import Planet from "./planet/Planet";
import { Joystick } from "react-joystick-component";
import { Vector3 } from "three";
import { pressStart2P } from "@/app/fonts";
import { WaitRoom } from "@/components/WaitRoom";
import { ItemData, PLANET_RADIUS, PlayerData } from "@/party/planet";
import { Item } from "./Item";
import { Rocket } from "./Rocket";
import { updatePlayer } from "@/game/planet";

function usePressedKeys() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      setPressedKeys((prev) => new Set(prev).add(event.key));
    };

    const onKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return pressedKeys;
}

export function Game({ gameID }: { gameID: string }) {
  const [planetID, setPlanetID] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<number | null>(null);

  const gameSocket = usePartySocket({
    host: PARTYKIT_HOST,
    room: gameID,
    onMessage(event) {
      const dataReceived = JSON.parse(event.data);
      console.log("Received message", dataReceived);
      if (dataReceived.type === "CONN") {
        setPlanetID(dataReceived.data);
      } else if (dataReceived.type === "WAIT") {
        setWaiting(dataReceived.data);
      }
    },
  });

  if (!planetID) {
    return <WaitRoom waiting={waiting} gameID={gameID} />;
  }

  // Render the game world if planetID is available
  return <GamePlanet planetID={planetID} />;
}

export function GamePlanet({ planetID }: { planetID: string }) {
  const [players, setPlayers] = useState<{ [id: string]: PlayerData }>({});
  const [items, setItems] = useState<{ [id: string]: ItemData }>({});

  const planetSocket = usePartySocket({
    host: PARTYKIT_HOST,
    room: planetID,
    party: "planet",
    onMessage(event) {
      const { players, items } = JSON.parse(event.data);
      setPlayers(players);
      setItems(items);
    },
  });

  const optimisticUpdate = (delta: number) => {
    const player = players[planetSocket.id];

    if (!player) return;

    const { position, quaternion } = updatePlayer(
      {
        position: player.position,
        quaternion: player.quaternion,
      },
      delta,
      inputDirection.toArray() as [number, number, number],
      PLANET_RADIUS
    );

    if (position !== player.position || quaternion !== player.quaternion) {
      setPlayers({
        ...players,
        [planetSocket.id]: {
          ...player,
          position,
          quaternion,
        },
      });
    }
  };

  const [joystickDirection, setJoystickDirection] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  const pressedKeys = usePressedKeys();

  const inputDirection = pressedKeys.size
    ? pressedKeysToVector(pressedKeys)
    : joystickDirection;

  useEffect(() => {
    planetSocket.send(
      JSON.stringify({ inputDirection: inputDirection.toArray() })
    );
  }, [inputDirection]);

  const itemCounts = Object.values(items).reduce(
    (counts, item) => ({ ...counts, [item.name]: counts[item.name] + 1 }),
    { screwdriver: 0, fuel: 0 }
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas>
        <GameWorld
          players={players}
          localPlayerID={planetSocket.id}
          items={items}
          onFrame={optimisticUpdate}
        />
      </Canvas>
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <Joystick
          size={100}
          sticky={false}
          baseColor="white"
          stickColor="grey"
          start={() => setJoystickDirection(new Vector3(0, 0, 0))}
          move={(e) => setJoystickDirection(new Vector3(e.x!, 0, -e.y!))}
          stop={() => setJoystickDirection(new Vector3(0, 0, 0))}
        />
      </div>
      <div className="flex flex-col absolute top-2 left-2 right-2">
        <span>PID: {planetID}</span>

        {Object.entries(itemCounts).map(([name, count]) => (
          <div className="flex flex-row gap-2">
            <span>{count}x</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="absolute text-center top-3 w-full">
        <h1
          className={`${pressStart2P.className} text-2xl text-black dark:text-white mb-20`}
        >
          - Worlds Apart -
        </h1>
      </div>
    </div>
  );
}

function pressedKeysToVector(pressedKeys: Set<string>): Vector3 {
  const vector = new Vector3(0, 0, 0);

  // UP
  if (
    pressedKeys.has("w") ||
    pressedKeys.has("W") ||
    pressedKeys.has("ArrowUp")
  ) {
    vector.z -= 1;
  }

  // LEFT
  if (
    pressedKeys.has("a") ||
    pressedKeys.has("A") ||
    pressedKeys.has("ArrowLeft")
  ) {
    vector.x -= 1;
  }

  // DOWN
  if (
    pressedKeys.has("s") ||
    pressedKeys.has("S") ||
    pressedKeys.has("ArrowDown")
  ) {
    vector.z += 1;
  }

  // RIGHT
  if (
    pressedKeys.has("d") ||
    pressedKeys.has("D") ||
    pressedKeys.has("ArrowRight")
  ) {
    vector.x += 1;
  }

  // PUNCH
  if (pressedKeys.has("e") || pressedKeys.has("E")) {
  }

  return vector;
}

function GameWorld({
  players,
  localPlayerID,
  items,
  onFrame,
}: {
  players: { [id: string]: PlayerData };
  localPlayerID: string;
  items: { [id: string]: ItemData };
  onFrame: (delta: number) => void;
}) {
  // optimistic updates
  useFrame((_, delta) => {
    onFrame(delta);
  });

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <Stars
        radius={40}
        depth={30}
        count={2500}
        factor={4}
        saturation={1}
        fade
        speed={0.5}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Planet radius={PLANET_RADIUS} position={[0, 0, 0]} />

      <Rocket
        position={[0, PLANET_RADIUS + 20, 0]}
        rotation={[3.5, 0, 0]}
        scale={5}
      />

      {Object.entries(players).map(([id, player]) => (
        <Player
          key={id}
          position={player.position}
          quaternion={player.quaternion}
          direction={player.inputDirection}
          isLocalPlayer={id === localPlayerID}
          name={player.name}
        />
      ))}

      {Object.entries(items).map(([id, item]) => (
        <Item
          key={id}
          position={item.position}
          quaternion={item.quaternion}
          name={item.name}
        />
      ))}

      <PerspectiveCamera
        position={[0, 0, 150]}
        makeDefault={!players[localPlayerID]}
      />
    </>
  );
}
