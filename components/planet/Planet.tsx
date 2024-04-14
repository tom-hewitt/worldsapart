import * as THREE from "three";
import React, { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";


import vertex from './shaders/shader.vert'
import fragment from './shaders/shader.frag'

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color(1, 0.25, 0.25),
    colorB: new THREE.Color(0.31, 0.6, 0.94),
    colorC: new THREE.Color(0.85, 0.46, 0.22),
    colorD: new THREE.Color(0.88, 0.49, 0.8),
    shaderType: 5
  },
  vertex,
  fragment
)

extend({ ColorShiftMaterial })

function Planet({
  radius,
  segments = 64,
  color = [90, 63, 10],
  position,
  rotation,
  //shaderType -> 0 for stripes, 1 for gradient
  shaderType = 0
  
}: {
  radius: number;
  segments?: number;
  color?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  shaderType?: number;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  function generateContrastColors(baseColor: number[]): THREE.Color[] {
    // Helper function to ensure the color value is within 0-255 range
    const clamp = (value: number) => Math.max(0, Math.min(value, 255));

    // Extract RGB components
    const [r, g, b] = baseColor;
    const baseThreeColor = new THREE.Color(
      r % 255 / 255, g % 255 / 255, b % 255 / 255
    );

    const complementaryColorA = new THREE.Color(
      (255 - r) / 255,
      (255 - g) / 255,
      (255 - b) / 255
    );

    const complementaryColorB = new THREE.Color(
      (r + 64) % 255 / 255,
      (g + 64) % 255 / 255,
      (b + 64) % 255 / 255
    );

    const complementaryColorC = new THREE.Color(
      (r + 64) % 255 / 255,
      (g + 128) % 255 / 255,
      (b + 192) % 255 / 255
    );

    return [baseThreeColor, complementaryColorA, complementaryColorB, complementaryColorC];
  }

  const randomColors = generateContrastColors(color);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[radius, segments, segments]} />
      {/* @ts-ignore */}
      <colorShiftMaterial
        colorA={randomColors[0]}
        colorB={randomColors[1]}
        colorC={randomColors[2]}
        colorD={randomColors[3]}
        shaderType={shaderType} />
    </mesh>
  );
}

export default Planet;
