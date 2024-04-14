import { Vector3 } from "three";
import { Fuel } from "./Fuel";
import { Screwdriver } from "./Screwdriver";
import { Float } from "@react-three/drei";

export function Item({
  name,
  position,
  quaternion,
}: {
  name: "screwdriver" | "fuel";
  position: [number, number, number];
  quaternion: [number, number, number, number];
}) {
  return (
    <group position={position} quaternion={quaternion}>
      <Float
        speed={20} // Animation speed, defaults to 1
        rotationIntensity={0} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <arrowHelper
          args={[
            new Vector3(0, -1, 0),
            new Vector3(0, 2, 0),
            2,
            0x00ff00,
            1,
            1,
          ]}
        />
      </Float>
      <ItemModel name={name} />
    </group>
  );
}

function ItemModel({ name }: { name: "screwdriver" | "fuel" }) {
  switch (name) {
    case "screwdriver":
      return <Screwdriver scale={0.1} />;
    case "fuel":
      return <Fuel scale={0.2} position={[0, 0.4, 0]} />;
  }
}
