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

function useKeyDown(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}

function useKeyUp(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  }, [handler]);
}

export function Game({ gameID }: { gameID: string }) {
  const [currentDirection, setCurrentDirection] = useState<string | null>(null); // Used for joystick

  const [inputDirection, setInputDirection] = useState<Direction | null>(null);

  useKeyDown((event) => {
    switch (event.key) {
      case "w":
        setInputDirection("FORWARD");
        break;
      case "a":
        setInputDirection("LEFT");
        break;
      case "s":
        setInputDirection("BACKWARD");
        break;
      case "d":
        setInputDirection("RIGHT");
        break;
    }
  });

  useKeyUp((event) => {
    switch (event.key) {
      case "w":
      case "a":
      case "s":
      case "d":
        setInputDirection(null);
        break;
    }
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas>
        <GameWorld inputDirection={inputDirection} />
      </Canvas>
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <Joystick
          size={100}
          sticky={false}
          baseColor="black"
          stickColor="grey"
          start={() => setCurrentDirection(null)}
          move={(e) => setInputDirection(e.direction)}
        />
      </div>
    </div>
  );
}

const GRAVITY = -9.81;

const MOVEMENT_SPEED = 10;

type Direction = "FORWARD" | "LEFT" | "BACKWARD" | "RIGHT";

function directionToVector(direction: Direction): [number, number, number] {
  switch (direction) {
    case "FORWARD":
      return [0, 0, -1];
    case "LEFT":
      return [-1, 0, 0];
    case "BACKWARD":
      return [0, 0, 1];
    case "RIGHT":
      return [1, 0, 0];
  }
}
function GameWorld({ inputDirection }: { inputDirection: Direction | null }) {
  const [position, setPosition] = useState<[number, number, number]>([
    0, 20, 0,
  ]);

  const [quaternion, setQuaternion] = useState<
    [number, number, number, number]
  >([0, 0, 0, 1]);

  useFrame((_, delta) => {
    // direction gravity is being applied
    const gravityDirection = new Vector3(...position).normalize();

    // current up direction of the body
    const bodyUp = new Vector3(0, 1, 0).applyQuaternion(
      new Quaternion().fromArray(quaternion)
    );

    console.log({ ...bodyUp });

    setQuaternion(
      (quaternion) =>
        new Quaternion()
          .setFromUnitVectors(gravityDirection, bodyUp)
          .multiply(new Quaternion().fromArray(quaternion))
          .toArray() as [number, number, number, number]
    );

    const positionVector = new Vector3(...position);

    if (positionVector.length() > 10) {
      setPosition(
        positionVector
          .add(gravityDirection.multiplyScalar(GRAVITY * delta))
          .toArray() as [number, number, number]
      );
    } else if (positionVector.length() < 10) {
      setPosition(
        positionVector
          .multiplyScalar(10 / positionVector.length())
          .toArray() as [number, number, number]
      );
    }
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
    </>
  );
}
