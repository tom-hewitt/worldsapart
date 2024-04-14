export function Item({
  position,
  quaternion,
}: {
  position: [number, number, number];
  quaternion: [number, number, number, number];
}) {
  return (
    <mesh position={position} quaternion={quaternion}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
