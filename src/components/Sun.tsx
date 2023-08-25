import { Sparkles } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";
import { Planet } from "./Planet";
import { useRef } from "react";

export const Sun = () => {
  const texture = useLoader(TextureLoader, ["/sun.jpg"]) as THREE.Texture[];
  const sunRef = useRef<Group>(null);
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.00025;
    }
  });
  return (
    <group ref={sunRef}>
      <Sparkles speed={0.5} scale={[40, 40, 40]} size={4} count={25} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />

      <pointLight position={[25, 0, 0]} intensity={0.5} />
      <pointLight position={[-25, 0, 0]} intensity={0.5} />
      <pointLight position={[0, -25, 0]} intensity={0.5} />
      <pointLight position={[0, 0, 25]} intensity={0.5} />
      <pointLight position={[0, 0, -25]} intensity={0.5} />
      <Planet opacity={1} scale={6} texture={texture[0]} position={[0, 0, 0]} />
    </group>
  );
};
