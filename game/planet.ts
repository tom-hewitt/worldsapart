import { PLANET_RADIUS } from "@/party/planet";
import { Quaternion, Vector3 } from "three";

const GRAVITY = -9.81;
const MOVEMENT_SPEED = 10;

export function randomPlanetSurfacePlacement(): {
  position: [number, number, number];
  quaternion: [number, number, number, number];
} {
  const direction = new Vector3().randomDirection();

  const position = direction.multiplyScalar(PLANET_RADIUS).toArray() as [
    number,
    number,
    number
  ];

  return {
    position: position,
    quaternion: planetSurfaceQuaternion(position),
  };
}

export function planetSurfaceQuaternion(
  position: [number, number, number],
  quaternion: [number, number, number, number] = [0, 0, 0, 1]
): [number, number, number, number] {
  const gravityDirection = new Vector3(...position).normalize();

  const bodyUp = new Vector3(0, 1, 0);

  return new Quaternion()
    .setFromUnitVectors(bodyUp, gravityDirection)
    .multiply(new Quaternion(...quaternion))
    .toArray() as [number, number, number, number];
}

export function updatePlayer(
  current: {
    position: [number, number, number];
    quaternion: [number, number, number, number];
  },
  delta: number,
  inputDirection: [number, number, number],
  planetRadius: number
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

  const movementVector = new Vector3(...inputDirection)
    .applyQuaternion(new Quaternion().fromArray(current.quaternion))
    .multiplyScalar(MOVEMENT_SPEED * delta);

  positionVector.add(movementVector);

  const length = positionVector.length();

  // apply gravity
  if (length > planetRadius) {
    positionVector.add(
      gravityDirection.clone().multiplyScalar(GRAVITY * delta)
    );
  }
  if (length < planetRadius) {
    positionVector.multiplyScalar(planetRadius / positionVector.length());
  }

  const position = positionVector.toArray() as [number, number, number];

  return { quaternion, position };
}
