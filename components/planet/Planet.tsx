import * as THREE from "three";
import React, { useRef } from "react";

function Planet({
  radius,
  segments = 64,
  color = "#304674",
  position,
  rotation,
}: {
  radius: number;
  segments?: number;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;
