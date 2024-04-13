import { forwardRef } from "react";
import { Group } from "three";

export const pyramidShipPart = forwardRef<Group | null > (function Player(props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
});
