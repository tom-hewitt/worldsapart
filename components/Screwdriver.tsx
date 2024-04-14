/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 screwdriver.glb --types 
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder001: THREE.Mesh;
    Cylinder: THREE.Mesh;
  };
  materials: {
    Gris: THREE.MeshStandardMaterial;
    Vert: THREE.MeshPhysicalMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Screwdriver(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/screwdriver.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials.Gris}
        position={[0.118, 0, -0.111]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials.Vert}
        position={[0.121, 0, -0.077]}
        rotation={[-1.57, 0, 0]}
        scale={[0.337, 3.557, 0.337]}
      />
    </group>
  );
}

useGLTF.preload("/screwdriver.glb");
