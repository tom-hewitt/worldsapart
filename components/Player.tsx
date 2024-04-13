import { PerspectiveCamera } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Object3D, Vector3 } from "three";

export const Player = forwardRef<Group | null>(function Player(props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      />
      <PerspectiveCamera position={[0, 1, 10]} makeDefault={true} />
    </group>
  );
});
