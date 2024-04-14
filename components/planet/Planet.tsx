import * as THREE from "three";
import React, { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";


import vertex from './shaders/shader.vert'
import fragment from './shaders/shader.frag'

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.2, 0.025),
  },
  vertex,
  fragment
)

extend({ ColorShiftMaterial })


function Planet({
  radius,
  segments = 64,
  color = "blue",
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

  // const fragmentShader = `...`;
  // const vertexShader = `...`;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[radius, segments, segments]} />
      {/* @ts-ignore */}
      <colorShiftMaterial/>
    </mesh>
  );
}

export default Planet;
