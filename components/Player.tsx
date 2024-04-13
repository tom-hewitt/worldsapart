import { PerspectiveCamera } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

function sphericalToCartesian([r, theta, phi]: [number, number, number]): [
  number,
  number,
  number
] {
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);
  return [x, y, z];
}

function sphericalToRotation([r, theta, phi]: [number, number, number]): [
  number,
  number,
  number
] {
  return [Math.PI / 2 - theta, phi, 0];
}

export function Player({
  sphericalPosition,
}: {
  sphericalPosition: [number, number, number];
}) {
  const position = sphericalToCartesian(sphericalPosition);

  const rotation = sphericalToRotation(sphericalPosition);

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
}
