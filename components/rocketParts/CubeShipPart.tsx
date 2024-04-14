import { forwardRef } from "react";
import { Group } from "three";

export const cubeShipPart = forwardRef<Group | null > (function cubeShipPart(props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
});
