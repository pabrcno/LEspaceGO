import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { SpaceshipMesh } from "./SpaceShipMesh";
function lerp(current: number, target: number, factor: number) {
  return current + factor * (target - current);
}
export function SpaceShip(): JSX.Element {
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const mainBoxRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const shotSound = useMemo(() => new Audio("/laser-shot.wav"), []);
  const legoSound = useMemo(() => new Audio("/lego-click.wav"), []);

  const handleShoot = () => {
    if (!mainBoxRef.current) return;

    // Get the spaceship's current position and orientation
    const shipPosition = mainBoxRef.current.position.clone();
    const shipQuaternion = mainBoxRef.current.quaternion.clone();

    // Offset laser start position based on orientation
    const offset = new THREE.Vector3(0, 0, 0).applyQuaternion(shipQuaternion);
    const shootPosition = shipPosition.add(offset);

    setLasers((prevLasers) => [...prevLasers, shootPosition]);

    shotSound.volume = 0.05;
    legoSound.play().catch((err) => console.error(err));
    shotSound.play().catch((err) => console.error(err));
  };
  const prevRotationX = useRef(Math.PI / 2);
  const prevRotationY = useRef(0);
  const prevPositionX = useRef(0);
  const prevPositionY = useRef(0);
  const lerpFactor = 0.05;
  useFrame(({ mouse, viewport: { width, height } }) => {
    if (!mainBoxRef.current) return;

    // Target rotation and position based on mouse movement
    const targetRotationX = Math.PI / 2 + mouse.y * 0.25;
    const targetRotationY = mouse.x * Math.PI * 0.25;
    const targetPositionX = mouse.x * width;
    const targetPositionY = mouse.y * height;

    // Damping: Use lerp to calculate the new rotation and position
    const newRotationX = lerp(
      prevRotationX.current,
      targetRotationX,
      lerpFactor
    );
    const newRotationY = lerp(
      prevRotationY.current,
      targetRotationY,
      lerpFactor
    );
    const newPositionX = lerp(
      prevPositionX.current,
      targetPositionX,
      lerpFactor
    );
    const newPositionY = lerp(
      prevPositionY.current,
      targetPositionY,
      lerpFactor
    );

    // Apply the calculated rotation and position to the box
    mainBoxRef.current.rotation.set(newRotationX, newRotationY, -Math.PI);
    mainBoxRef.current.position.set(
      newPositionX,
      newPositionY,
      camera.position.z - 3.5
    );

    // Store the new values for the next frame
    prevRotationX.current = newRotationX;
    prevRotationY.current = newRotationY;
    prevPositionX.current = newPositionX;
    prevPositionY.current = newPositionY;
    // Update lasers position
    setLasers((prevLasers) =>
      prevLasers
        .filter((laser) => laser.z > camera.position.z - 20)
        .map((laser) => {
          const updatedLaser = laser.clone();
          updatedLaser.z -= 0.6;
          return updatedLaser;
        })
    );
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleShoot();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    window.addEventListener("click", handleShoot);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SpaceshipMesh ref={mainBoxRef} />
      {lasers.map((laserPosition, idx) => (
        <Box
          scale={[0.01, 0.01, 0.1]}
          key={idx}
          name="laser"
          position={laserPosition}
          material-color="red"
        />
      ))}
    </>
  );
}
