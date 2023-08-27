import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function lerp(current: number, target: number, factor: number) {
  return current + factor * (target - current);
}

type LerpResults = {
  mainBoxRef: React.MutableRefObject<THREE.Object3D | null>;
};

type LerpParameters = {
  offsetX?: number;
  offsetY?: number;
  factor?: number;
  delay?: number; // in milliseconds
};

export function useLerp({
  offsetX = 0,
  offsetY = 0,
  factor = 0.025,
  delay = 0,
}: LerpParameters = {}): LerpResults {
  const mainBoxRef = useRef<THREE.Object3D | null>(null);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  const prevRotationX = useRef(Math.PI / 2);
  const prevRotationY = useRef(0);
  const prevPositionX = useRef(0);
  const prevPositionY = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldUpdate(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  useFrame(({ mouse, viewport: { width, height }, camera }) => {
    if (!mainBoxRef.current || !shouldUpdate) return;

    // Target rotation and position based on mouse movement
    const targetRotationX = Math.PI / 2 + (mouse.y + offsetY) * 0.25;
    const targetRotationY = (mouse.x + offsetX) * Math.PI * 0.25;
    const targetPositionX = (mouse.x + offsetX) * width;
    const targetPositionY = (mouse.y + offsetY) * height;

    // Damping: Use lerp to calculate the new rotation and position
    const newRotationX = lerp(prevRotationX.current, targetRotationX, factor);
    const newRotationY = lerp(prevRotationY.current, targetRotationY, factor);
    const newPositionX = lerp(prevPositionX.current, targetPositionX, factor);
    const newPositionY = lerp(prevPositionY.current, targetPositionY, factor);

    // Apply the calculated rotation and position to the box
    mainBoxRef.current.rotation.set(newRotationX, newRotationY, -Math.PI);
    mainBoxRef.current.position.x = newPositionX * 0.35;
    mainBoxRef.current.position.y = newPositionY * 0.35;

    // Store the new values for the next frame
    prevRotationX.current = newRotationX;
    prevRotationY.current = newRotationY;
    prevPositionX.current = newPositionX;
    prevPositionY.current = newPositionY;
    camera.rotation.y = -newPositionX * 0.05;
    camera.rotation.x = newPositionY * 0.05;

    camera.updateProjectionMatrix();
  });

  return { mainBoxRef };
}
