import * as THREE from "three";
import React, {useRef} from "react";

function Planet(props : any) {
  const meshRef = useRef();

  // Extract parameters from props or set default values
  const {
    radius = 1,
    segments = 32,
    color = "orange",
  } = props;

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;