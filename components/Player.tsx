import { PerspectiveCamera } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Vector3 } from "three";
import { Astronaut } from "./Astronaut";

export const Player = forwardRef<
  Group | null,
  { direction: [number, number, number] }
>(function Player({ direction }, ref) {
  return (
    <group ref={ref}>
      <Astronaut direction={direction} />

      {/* <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      /> */}
      <PerspectiveCamera position={[0, 1, 10]} makeDefault={true} />
    </group>
  );
});
