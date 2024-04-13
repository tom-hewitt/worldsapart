import { PerspectiveCamera, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

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

  const { nodes, animations } = useGLTF("/models/astronaut_test.glb");
  const { ref, actions, names } = useAnimations(animations);
  const [index, setIndex] = useState(3)

  console.log(nodes)

  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]]?.reset().fadeIn(0.5).play();

    // In the clean-up phase, fade it out
    return () => {
      actions[names[index]]?.fadeOut(0.5);
    };
  }, [index, actions, names]);

  return (
    <group position={position} rotation={rotation}>
       <group name="Scene">
        <group name="Idle" rotation={[Math.PI / 2, 0, 0]} scale={2}>
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
        <group name="jump" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_1} />
        </group>
        <group name="run" rotation={[Math.PI / 2, 0, 0]} scale={2}>
          <primitive object={nodes.mixamorigHips_2} />
        </group>
      </group>

      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
    </group>
  );
}
