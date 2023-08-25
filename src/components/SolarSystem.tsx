import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Planet } from "./Planet";
import { textureUris } from "../constants";
import { OrbitControls, Stars } from "@react-three/drei";
import { LegoRing } from "./LegoRing";

import { Group } from "three/src/objects/Group.js";

type TPlanetData = {
  name: string;
  scale: number;
  orbitRadius: number;
  rotationSpeed: number;
  orbitSpeed: number;
  textureUri: string;
};

const orbitBrake = 2;
const planetData: TPlanetData[] = [
  {
    name: "mercury",
    scale: 0.283,
    orbitRadius: 60,
    rotationSpeed: 0.005,
    orbitSpeed: 4.17 / orbitBrake,
    textureUri: textureUris.mercury,
  },
  {
    name: "venus",
    scale: 0.949,
    orbitRadius: 90,
    rotationSpeed: 0.004,
    orbitSpeed: 1.61 / orbitBrake,
    textureUri: textureUris.venus,
  },
  {
    name: "earth",
    scale: 1,
    orbitRadius: 130,
    rotationSpeed: 0.003,
    orbitSpeed: 1 / orbitBrake,
    textureUri: textureUris.earth,
  },
  {
    name: "mars",
    scale: 0.532,
    orbitRadius: 180,
    rotationSpeed: 0.002,
    orbitSpeed: 0.53 / orbitBrake,
    textureUri: textureUris.mars,
  },
  {
    name: "jupiter",
    scale: 4,
    orbitRadius: 210,
    rotationSpeed: 0.001,
    orbitSpeed: 0.08 / orbitBrake,
    textureUri: textureUris.jupiter,
  },
  {
    name: "saturn",
    scale: 3,
    orbitRadius: 280,
    rotationSpeed: 0.0009,
    orbitSpeed: 0.03 / orbitBrake,
    textureUri: textureUris.saturn,
  },
  {
    name: "uranus",
    scale: 2,
    orbitRadius: 320,
    rotationSpeed: 0.0008,
    orbitSpeed: 0.01 / orbitBrake,
    textureUri: textureUris.uranus,
  },
  {
    name: "neptune",
    scale: 1.9,
    orbitRadius: 360,
    rotationSpeed: 0.0007,
    orbitSpeed: 0.006 / orbitBrake,
    textureUri: textureUris.neptune,
  },
];

interface PlanetProps extends TPlanetData {
  texture: THREE.Texture;
}

const AnimatedPlanet: React.FC<PlanetProps> = ({
  scale,
  texture,
  orbitRadius,
  rotationSpeed,
  orbitSpeed,
  name,
}) => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotates the planet on its axis
      meshRef.current.rotation.y += rotationSpeed;

      // Rotate planet around the "Sun" or center
      const elapsedTime = state.clock.getElapsedTime();
      const angle = orbitSpeed * (elapsedTime + 200);

      // Calculate new x and z positions based on orbit
      meshRef.current.position.x = orbitRadius * Math.cos(angle);
      meshRef.current.position.z = orbitRadius * Math.sin(angle);
    }
  });

  return (
    <group ref={meshRef as unknown as React.Ref<Group>}>
      <Planet scale={scale} texture={texture} />
      {name === "earth" && (
        <LegoRing
          scale={[1.2, 1.2, 1.2]}
          amount={1}
          radius={10}
          rotationSpeed={0.0001}
          color="gray"
        />
      )}
      {/* For Jupiter, render the ring of Legos */}
      {name === "saturn" && (
        <>
          <LegoRing
            scale={[1, 1, 1]}
            amount={10}
            radius={20}
            rotationSpeed={0.01}
            color="gray"
          />
          <LegoRing
            scale={[1, 1, 1]}
            amount={15}
            radius={30}
            rotationSpeed={0.005}
            color="gray"
          />
        </>
      )}
    </group>
  );
};

export const SolarSystem: React.FC = () => {
  const textures = useLoader(
    TextureLoader,
    planetData.map((planet) => planet.textureUri)
  ) as THREE.Texture[];

  return (
    <Canvas
      style={{
        cursor: "grab",
      }}
    >
      <camera position={[0, 0, -10]} />

      <group scale={[0.05, 0.05, 0.05]}>
        <Stars
          radius={100}
          depth={200}
          count={900}
          factor={0.01}
          saturation={0}
        />
        {
          //sun
        }
        <group>
          <pointLight
            position={[0, 25, 0]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />

          <pointLight
            position={[25, 0, 0]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />
          <pointLight
            position={[-25, 0, 0]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />
          <pointLight
            position={[0, -25, 0]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />
          <pointLight
            position={[0, 0, 25]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />
          <pointLight
            position={[0, 0, -25]}
            scale={[20, 20, 20]}
            intensity={0.5}
          />
          <Planet
            opacity={1}
            scale={6}
            texture={textures[1]}
            position={[0, 0, 0]}
          />
        </group>
        {planetData.map((planet, index) => {
          return (
            <AnimatedPlanet
              key={planet.name}
              {...planet}
              texture={textures[index]}
            />
          );
        })}
      </group>

      <OrbitControls />
    </Canvas>
  );
};
