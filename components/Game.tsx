"use client";

import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePartySocket } from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { Player } from "./Player";
import { PerspectiveCamera } from "@react-three/drei";
import Planet from "./planet/Planet";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { Object3D, Quaternion, Vector3 } from "three";

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
  const [currentDirection, setCurrentDirection] = useState<string | null>(null); // Used for joystick

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas>
        <GameWorld />
      </Canvas>
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <Joystick
          size={100}
          sticky={false}
          baseColor="white"
          stickColor="grey"
          start={() => setCurrentDirection(null)}
          move={(e) => console.log(e.direction)}
        />
      </div>
    </div>
  );
}

const GRAVITY = -9.81;

const MOVEMENT_SPEED = 10;

type Direction = "FORWARD" | "LEFT" | "BACKWARD" | "RIGHT";

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
function GameWorld() {
  const [position, setPosition] = useState<[number, number, number]>([
    0, 20, 0,
  ]);

  const [quaternion, setQuaternion] = useState<
    [number, number, number, number]
  >([0, 0, 0, 1]);

  const pressedKeys = usePressedKeys();

  useFrame((_, delta) => {
    // direction gravity is being applied
    const gravityDirection = new Vector3(...position).normalize();

    // current up direction of the body
    const bodyUp = new Vector3(0, 1, 0).applyQuaternion(
      new Quaternion().fromArray(quaternion)
    );

    setQuaternion(
      new Quaternion()
        .setFromUnitVectors(bodyUp, gravityDirection)
        .multiply(new Quaternion().fromArray(quaternion))
        .toArray() as [number, number, number, number]
    );

    const positionVector = new Vector3(...position);

    const directionVector = pressedKeysToVector(pressedKeys);

    const movementVector = directionVector
      .applyQuaternion(new Quaternion().fromArray(quaternion))
      .multiplyScalar(MOVEMENT_SPEED * delta);

    positionVector.add(movementVector);

    if (positionVector.length() > 10) {
      positionVector.add(gravityDirection.multiplyScalar(GRAVITY * delta));
    } else if (positionVector.length() < 10) {
      positionVector.multiplyScalar(10 / positionVector.length()).toArray();
    }

    setPosition(positionVector.toArray() as [number, number, number]);
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
      <Player position={position} quaternion={quaternion} />
      {/* <PerspectiveCamera position={[0, 0, 60]} makeDefault /> */}
    </>
  );
}
