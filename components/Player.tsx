import { Float, PerspectiveCamera, Text } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Vector3 } from "three";
import { Astronaut } from "./Astronaut";

export const Player = forwardRef<
  Group | null,
  {
    direction: [number, number, number];
    position: [number, number, number];
    quaternion: [number, number, number, number];
    isLocalPlayer?: boolean;
    name?: string
    bodyColor?: [number, number, number]
  }
>(function Player(
  { direction, position, quaternion, isLocalPlayer = false, name = "test_1", bodyColor = [0, 144, 255] },
  ref
) {
  return (
    <group ref={ref} position={position} quaternion={quaternion}>
      <Astronaut direction={direction} />


      <Float
        speed={5} // Animation speed, defaults to 1
        rotationIntensity={0} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[5.5, 6]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Float>

      {/* <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      /> */}
      {isLocalPlayer ? (
        <PerspectiveCamera
          position={[0, 8, 20]}
          rotation={[-0.3, 0, 0]}
          makeDefault={true}
        />
      ) : null}

    </group>
  );
});
