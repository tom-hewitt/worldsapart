import { PerspectiveCamera } from "@react-three/drei";
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
  }
>(function Player(
  { direction, position, quaternion, isLocalPlayer = false },
  ref
) {
  return (
    <group ref={ref} position={position} quaternion={quaternion}>
      {/* <Astronaut direction={direction} /> */}

      <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      />
      {/* {isLocalPlayer ? (
        <PerspectiveCamera
          position={[0, 8, 20]}
          rotation={[-0.3, 0, 0]}
          makeDefault={true}
        />
      ) : null} */}
    </group>
  );
});
