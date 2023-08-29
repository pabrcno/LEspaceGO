import { Sparkles } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";
import { Planet } from "./Planet";
import { useRef } from "react";

export const Sun = () => {
  const texture = useLoader(TextureLoader, ["/sun.jpg"]) as THREE.Texture[];
  const sunRef = useRef<Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.0001;
    }
  });
  return (
    <group ref={sunRef}>
      <Sparkles speed={0.5} scale={[40, 40, 40]} size={20} count={25} />
      <pointLight
        position={[0, 35, 0]}
        intensity={3}
        distance={1000}
        ref={lightRef}
      />

      <pointLight position={[35, 0, 0]} intensity={1} distance={40} />
      <pointLight position={[-35, 0, 0]} intensity={1} distance={40} />
      <pointLight position={[0, -35, 0]} intensity={1} distance={40} />
      <pointLight position={[0, 0, 35]} intensity={1} distance={40} />
      <pointLight position={[0, 0, -35]} intensity={1} distance={40} />

      <Planet
        opacity={0.9}
        scale={6}
        texture={texture[0]}
        position={[0, 0, 0]}
      />
    </group>
  );
};
