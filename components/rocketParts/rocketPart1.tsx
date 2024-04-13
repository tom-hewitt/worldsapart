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

export function RocketPart1({
  sphericalPosition,
}: {
  sphericalPosition: [number, number, number];
}) {
  const position = sphericalToCartesian(sphericalPosition);

  const rotation = sphericalToRotation(sphericalPosition);

  const { nodes, animations } = useGLTF("../public/astronaught.glb");
  const { ref, actions, names } = useAnimations(animations);
  const [index, setIndex] = useState(3)

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
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.astronaught.geometry}
        skeleton={nodes.astronaught.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}>
      </skinnedMesh>
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
