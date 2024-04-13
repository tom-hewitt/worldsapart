import { forwardRef } from "react";
import { Group} from "three";

export const pyramidShipPart = forwardRef<Group | null > (function Player(props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <tetrahedronGeometry args={[10, 5]}/>
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
});
