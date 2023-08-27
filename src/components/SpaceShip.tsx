import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";
import { Box } from "@react-three/drei";
import { SpaceshipMesh } from "./SpaceShipMesh";
import { useLerp } from "../hooks/useLerp";
import * as THREE from "three";

export function SpaceShip(): JSX.Element {
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const shotSound = useMemo(() => new Audio("/laser-shot.wav"), []);
  const legoSound = useMemo(() => new Audio("/lego-click.wav"), []);

  const { mainBoxRef } = useLerp(); // Use the custom hook to get the reference

  const handleShoot = () => {
    if (!mainBoxRef.current) return;

    const shipPosition = mainBoxRef.current.position.clone();
    const shipQuaternion = mainBoxRef.current.quaternion.clone();

    const offset = new THREE.Vector3(0, 0, 0).applyQuaternion(shipQuaternion);
    const shootPosition = shipPosition.add(offset);

    setLasers((prevLasers) => [...prevLasers, shootPosition]);

    shotSound.volume = 0.05;
    legoSound.play().catch((err) => console.error(err));
    shotSound.play().catch((err) => console.error(err));
  };

  useFrame(({ camera }) => {
    if (!mainBoxRef.current) return;
    mainBoxRef.current.position.z = camera.position.z - 4;

    setLasers((prevLasers) =>
      prevLasers
        .filter((laser) => laser.z > camera.position.z - 15)
        .map((laser) => {
          const updatedLaser = laser.clone();
          updatedLaser.z -= 1.5;
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
