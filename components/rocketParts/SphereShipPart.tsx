import { forwardRef } from "react";
import { Group } from "three";

export const sphereShipPart = forwardRef<Group | null > (function sphereShipPart(props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
});
