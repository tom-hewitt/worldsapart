import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SkinnedMesh, Vector3 } from "three";


enum AnimationType {
  IDLE = "idle",
  RUN = "run",
  JUMP = "jump",
  BACKRUN = "backrun",
  PUNCHING = "punching",
  PUNCHREACT = "punchreact",
}

export function Player({
  position,
  quaternion,
  animationType
}: {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  animationType: AnimationType;
}) {
  const group = useRef<SkinnedMesh>();
  const { nodes, materials, animations } = useGLTF('models/finalgltfforreal.glb')
  const { actions } = useAnimations(animations, group)
  const verticalOffset = 5;

  useEffect(() => {
    actions?.[animationType]?.play();
  }, [animationType, actions]);

  return (

    <group position={position} quaternion={quaternion}>
      <group name="Scene" position={[0, 2.8, 0]}>
        <group name="idle" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <skinnedMesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
            skeleton={nodes.Cube.skeleton}
          />
          <skinnedMesh
            name="Cube001"
            geometry={nodes.Cube001.geometry}
            material={nodes.Cube001.material}
            skeleton={nodes.Cube001.skeleton}
          />
          <skinnedMesh
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={nodes.Cube002.material}
            skeleton={nodes.Cube002.skeleton}
          />
          <skinnedMesh
            name="Cube003"
            geometry={nodes.Cube003.geometry}
            material={nodes.Cube003.material}
            skeleton={nodes.Cube003.skeleton}
          />
          <skinnedMesh
            name="Cube004"
            geometry={nodes.Cube004.geometry}
            material={nodes.Cube004.material}
            skeleton={nodes.Cube004.skeleton}
          />
          <skinnedMesh
            name="Cube005"
            geometry={nodes.Cube005.geometry}
            material={nodes.Cube005.material}
            skeleton={nodes.Cube005.skeleton}
          />
          <skinnedMesh
            name="Cylinder"
            geometry={nodes.Cylinder.geometry}
            material={nodes.Cylinder.material}
            skeleton={nodes.Cylinder.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
        <group name="run" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_1} />
        </group>
        <group name="jump" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_2} />
        </group>
        <group name="backrun" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_3} />
        </group>
        <group name="punching" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_4} />
        </group>
        <group name="punchreact" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_5} />
        </group>
      </group>

      <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0xff0000, 3, 3]}
      />
      {/* <PerspectiveCamera position={[0, 1, 10]} makeDefault={true} /> */}
    </group>
  );
}

useGLTF.preload('models/finalgltfforreal.glb')
