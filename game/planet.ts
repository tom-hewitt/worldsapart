import { Quaternion, Vector3 } from "three";

const GRAVITY = -9.81;
const MOVEMENT_SPEED = 10;

export function updatePlayer(
  current: {
    position: [number, number, number];
    quaternion: [number, number, number, number];
  },
  delta: number,
  inputDirection: Vector3
): {
  position: [number, number, number];
  quaternion: [number, number, number, number];
} {
  // direction gravity is being applied
  const gravityDirection = new Vector3(...current.position).normalize();

  // current up direction of the body
  const bodyUp = new Vector3(0, 1, 0).applyQuaternion(
    new Quaternion().fromArray(current.quaternion)
  );

  const quaternion = new Quaternion()
    .setFromUnitVectors(bodyUp, gravityDirection)
    .multiply(new Quaternion().fromArray(current.quaternion))
    .toArray() as [number, number, number, number];

  const positionVector = new Vector3(...current.position);

  const movementVector = inputDirection
    .clone()
    .applyQuaternion(new Quaternion().fromArray(current.quaternion))
    .multiplyScalar(MOVEMENT_SPEED * delta);

  positionVector.add(movementVector);

  if (positionVector.length() > 10) {
    positionVector.add(gravityDirection.multiplyScalar(GRAVITY * delta));
  } else if (positionVector.length() < 10) {
    positionVector.multiplyScalar(10 / positionVector.length()).toArray();
  }

  const position = positionVector.toArray() as [number, number, number];

  return { quaternion, position };
}
