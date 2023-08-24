import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Lego1x1 } from "./Lego1x1";

type LegoRingProps = {
  amount: number;
  radius?: number;
  rotationSpeed?: number;
  color?: string | THREE.Color;
  scale?: [number, number, number];
};

export const LegoRing: React.FC<LegoRingProps> = ({
  amount,
  radius = 5, // Default radius of the circle
  rotationSpeed = 0.01, // Default rotation speed
  color,
  scale,
  ...props
}) => {
  const groupRef = useRef<THREE.Group>();

  // Update the group's rotation on every frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  // Calculate positions for each Lego based on the amount and radius
  const legos = [];
  for (let i = 0; i < amount; i++) {
    const angle = (i / amount) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);

    legos.push(
      <Lego1x1 key={i} position={[x, 0, z]} color={color} scale={scale} />
    );
  }

  return (
    <group ref={groupRef} {...props}>
      {legos}
    </group>
  );
};
