/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 fuel.glb --types 
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Canister: THREE.Mesh;
    lid: THREE.Mesh;
  };
  materials: {
    ["CanisterPaint.001"]: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Fuel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/fuel.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Canister.geometry}
        // material={materials["CanisterPaint.001"]}
        position={[-0.077, -2.496, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh
        geometry={nodes.lid.geometry}
        material={materials["CanisterPaint.001"]}
        position={[-0.077, -2.496, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/fuel.glb");
