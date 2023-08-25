import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { SpaceshipMesh } from "./SpaceShipMesh";

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

  useFrame(({ mouse, viewport: { width, height } }) => {
    if (!mainBoxRef.current) return;

    // Rotation based on mouse movement
    mainBoxRef.current.rotation.set(
      Math.PI / 2 + mouse.y * 0.25,
      mouse.x * Math.PI * 0.25,
      -Math.PI
    );
    mainBoxRef.current.position.set(
      mouse.x * width,
      mouse.y * height,
      camera.position.z - 3.5
    );
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
