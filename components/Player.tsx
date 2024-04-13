import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";

export function Player({
  position,
  quaternion,
}: {
  position: [number, number, number];
  quaternion: [number, number, number, number];
}) {
  return (
    <group position={position} quaternion={quaternion}>
      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="red" />
      </mesh> */}

      <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      />
      {/* <PerspectiveCamera position={[0, 1, 10]} makeDefault={true} /> */}
    </group>
  );
}
