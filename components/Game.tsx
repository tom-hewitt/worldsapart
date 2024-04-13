"use client";

import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { usePartySocket } from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { Player } from "./Player";
import { PerspectiveCamera } from "@react-three/drei";
import Planet from "./planet/Planet";

function useKeyDown(handler: (event: KeyboardEvent) => void) {
  React.useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}

function moveForward(
  [r, theta, phi]: [number, number, number],
  yaw: number,
  distance: number
): [number, number, number] {
  // Calculate the angular displacement given the distance to move
  const angularDistance = distance / r; // Convert linear distance to angular distance in radians

  // Adjust phi and theta to move in the "forward" direction based on yaw
  const deltaPhi = angularDistance * Math.sin(yaw); // Change in phi
  const deltaTheta = angularDistance * Math.cos(yaw); // Change in theta

  // Update phi and theta
  let newPhi = phi + deltaPhi;
  let newTheta = theta - deltaTheta; // Subtract because increasing theta moves down from the north pole

  // Normalize phi to be within 0 and 2*PI
  if (newPhi < 0) {
    newPhi += 2 * Math.PI;
  } else if (newPhi >= 2 * Math.PI) {
    newPhi -= 2 * Math.PI;
  }

  // Normalize theta to be within 0 and PI
  if (newTheta < 0) {
    newTheta = -newTheta;
    newPhi += Math.PI; // Crossed over the pole
  } else if (newTheta > Math.PI) {
    newTheta = 2 * Math.PI - newTheta;
    newPhi += Math.PI; // Crossed over the pole
  }

  // Ensure phi is normalized again after potentially crossing the pole
  if (newPhi >= 2 * Math.PI) {
    newPhi -= 2 * Math.PI;
  } else if (newPhi < 0) {
    newPhi += 2 * Math.PI;
  }

  return [r, newTheta, newPhi];
}

export function Game({ gameID }: { gameID: string }) {
  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: gameID,
    onMessage(event) {
      console.log("Received message:", event.data);
    },
  });

  const [position, setPosition] = useState<[number, number, number]>([
    10, 0, 0,
  ]);

  const [yaw, setYaw] = useState(0);

  useKeyDown((event) => {
    switch (event.key.toLowerCase()) {
      case "w":
      case "arrowup":
        setPosition((position) => moveForward(position, yaw, 0.1));
        socket.send("move up");
        break;
      case "a":
      case "arrowleft":
        setPosition(([r, theta, phi]) => [r, theta - 0.1, phi]);
        socket.send("move left");
        break;
      case "s":
      case "arrowdown":
        setPosition(([r, theta, phi]) => [r, theta, phi - 0.1]);
        socket.send("move down");
        break;
      case "d":
      case "arrowright":
        setPosition(([r, theta, phi]) => [r, theta + 0.1, phi]);
        socket.send("move right");
        break;
    }
  });

  return (
    <Canvas>
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
      <Player sphericalPosition={position} />
      <PerspectiveCamera position={[0, 0, 50]} makeDefault={true} />
    </Canvas>
  );
}
