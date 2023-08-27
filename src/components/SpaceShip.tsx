import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Line } from "@react-three/drei";
import * as THREE from "three";
import { SpaceshipMesh } from "./SpaceShipMesh";
import { useLerp } from "../hooks/useLerp";

export function SpaceShip(): JSX.Element {
  const { camera } = useThree(); // Extract camera from the react-three-fiber context.
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const shotSound = useMemo(() => new Audio("/laser-shot.wav"), []);
  const legoSound = useMemo(() => new Audio("/lego-click.wav"), []);
  const { mainBoxRef } = useLerp(); // Use the custom hook to get the reference

  const aimRef = useRef<THREE.Mesh>(null);

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

  useFrame(() => {
    if (!mainBoxRef.current) return;
    mainBoxRef.current.position.z = camera.position.z - 2;

    setLasers((prevLasers) =>
      prevLasers
        .filter((laser) => laser.z > camera.position.z - 15)
        .map((laser) => {
          const updatedLaser = laser.clone();
          updatedLaser.z -= 1.5;
          return updatedLaser;
        })
    );

    if (aimRef.current) {
      aimRef.current.position.set(
        mainBoxRef.current.position.x,
        mainBoxRef.current.position.y,
        mainBoxRef.current.position.z
      );

      aimRef.current.rotation.set(0, Math.PI, 0);
    }
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
      window.removeEventListener("click", handleShoot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SpaceshipMesh ref={mainBoxRef} />
      <Line
        points={[
          [0, 0, 0],
          [0, 0, 13],
        ]}
        color="darkgray"
        lineWidth={0.2}
        segments={true}
        dashed={true}
        dashSize={0.1}
        // @ts-expect-error - [ts] Property 'ref' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<Line> & Readonly<{ children?: ReactNode; }>'.
        ref={aimRef}
      />
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
