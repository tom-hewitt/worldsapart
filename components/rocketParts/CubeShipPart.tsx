import { PerspectiveCamera } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Object3D, Vector3 } from "three";

export const pyramidShipPart = forwardRef<Group | null > (function Player(props, ref) {
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
});
