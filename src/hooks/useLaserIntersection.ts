import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

type useLaserAlienIntersectionParams = {
  alienRef?: React.MutableRefObject<THREE.Object3D | null>;
  handleAlienHit: () => void;
};

export function useLaserIntersection({
  alienRef,
  handleAlienHit,
}: useLaserAlienIntersectionParams) {
  const [isHit, setIsHit] = useState(false);
  const raycaster = new THREE.Raycaster();
  const explosionAudio = useRef(new Audio("/explosion.wav")).current;
  explosionAudio.volume = 0.5;

  useFrame(({ scene }) => {
    // If already hit, no need to check further
    if (isHit) return;
    if (!alienRef?.current) return;

    const lasers = scene.children.filter((child) => child.name === "laser");
    for (const laser of lasers) {
      raycaster.set(laser.position, new THREE.Vector3(0, 0, -1));
      const intersects = raycaster.intersectObject(alienRef.current, true);
      if (intersects.length > 0 && intersects[0].distance < 0.1) {
        explosionAudio.play().catch((err) => console.error(err));
        setIsHit(true);
        scene.remove(laser);
        handleAlienHit();

        break;
      }
    }
  });

  return { isHit };
}
