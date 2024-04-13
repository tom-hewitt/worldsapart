import * as THREE from "three";
import React, { useRef } from "react";
import { ThreeElements } from "@react-three/fiber";

interface PlanetProps {
    name?: string;
    radius?: number;
    segments?: number;
    color?: string;
    rotation?: [number, number, number];
    position?: [number, number, number];

}

function Planet(props: PlanetProps) {
    const meshRef = useRef<THREE.Mesh | null>(null);

    // Extract parameters from props or set default values
    const {
        radius = 3,
        segments = 32,
        color = "blue",
        position = [0,0,0],
        rotation = [0,0,0]
    } = props;

    return (
        <mesh ref={meshRef} {...props}>
            <sphereGeometry args={[props.radius, props.segments, props.segments]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

export default Planet;