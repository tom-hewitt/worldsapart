"use client";

import React, { Ref, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePartySocket } from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { Player } from "./Player";
import { PerspectiveCamera } from "@react-three/drei";
import Planet from "./planet/Planet";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { Group, Object3D, Quaternion, Vector3 } from "three";
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
  const [joystickDirection, setJoystickDirection] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  const pressedKeys = usePressedKeys();

  const inputDirection = pressedKeys.size
    ? pressedKeysToVector(pressedKeys)
    : joystickDirection;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas>
        <GameWorld inputDirection={inputDirection} />
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
    </div>
  );
}

function pressedKeysToVector(pressedKeys: Set<string>): Vector3 {
  const vector = new Vector3(0, 0, 0);

  if (pressedKeys.has("w")) {
    vector.z -= 1;
  }
  if (pressedKeys.has("a")) {
    vector.x -= 1;
  }
  if (pressedKeys.has("s")) {
    vector.z += 1;
  }
  if (pressedKeys.has("d")) {
    vector.x += 1;
  }

  return vector;
}
function GameWorld({ inputDirection }: { inputDirection: Vector3 }) {
  const playerRef = React.useRef<Group | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.position.set(0, 20, 0);

    playerRef.current.quaternion.set(0, 0, 0, 1);
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    console.log(inputDirection);

    const { position, quaternion } = updatePlayer(
      {
        position: playerRef.current.position.toArray() as [
          number,
          number,
          number
        ],
        quaternion: playerRef.current.quaternion.toArray() as [
          number,
          number,
          number,
          number
        ],
      },
      delta,
      inputDirection
    );

    playerRef.current.position.set(...position);

    playerRef.current.quaternion.set(...quaternion);
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
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Planet radius={10} position={[0, 0, 0]} />
      <Player ref={playerRef} />
      {/* <PerspectiveCamera position={[0, 0, 60]} makeDefault /> */}
    </>
  );
}
