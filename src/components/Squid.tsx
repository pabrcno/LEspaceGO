import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useMemo, useRef, Ref } from "react";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { useLerp } from "../hooks/useLerp";
import { SquidMesh } from "./SquidMesh";

export function Squid(): JSX.Element {
  const { camera } = useThree(); // Extract camera from the react-three-fiber context.
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const shotSound = useMemo(() => new Audio("/laser-shot.wav"), []);
  const legoSound = useMemo(() => new Audio("/lego-click.wav"), []);
  const squidRef = useRef<THREE.Group>(null);

  const aimRef = useRef<THREE.Mesh>(null);

  const handleShoot = () => {
    if (!squidRef.current) return;

    const squidPosition = new THREE.Vector3(
      squidRef.current.position.x,
      squidRef.current.position.y,
      squidRef.current.position.z
    );

    const shipQuaternion = squidRef.current.quaternion.clone();

    const offset = new THREE.Vector3(0, 0, 0).applyQuaternion(shipQuaternion);
    const shootPosition = squidPosition
      .add(offset)
      .add(new THREE.Vector3(0, 0, 0.5));

    legoSound.play().catch((err) => console.error(err));
    setLasers((prevLasers) => [...prevLasers, shootPosition]);
  };

  useFrame(({ mouse }) => {
    if (!squidRef.current) return;
    squidRef.current.position.z = camera.position.z - 8;
    squidRef.current.position.x = mouse.x - 2.5;
    squidRef.current.position.y = mouse.y;

    setLasers((prevLasers) =>
      prevLasers
        .filter((laser) => laser.z > camera.position.z)
        .map((laser) => {
          const updatedLaser = laser.clone();

          return updatedLaser;
        })
    );
  });

  useEffect(() => {
    setInterval(() => {
      handleShoot();
    }, 1000);
  }, []);

  return (
    <>
      <group ref={squidRef as Ref<THREE.Group>} rotation={[Math.PI / 2, 0, 0]}>
        <SquidMesh />
      </group>
      {lasers.map((laserPosition, idx) => (
        <SquidMesh
          scale={[0.1, 0.1, 0.1]}
          key={idx}
          name="squidlaser"
          position={laserPosition}
        />
      ))}
    </>
  );
}
