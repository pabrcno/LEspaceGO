import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Planet } from "./Planet";
import { textureUris } from "../constants";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { LegoRing } from "./LegoRing";
import * as THREE from "three";
import { Group } from "three/src/objects/Group.js";
import { Sun } from "./Sun";
import { SpaceshipMesh } from "./SpaceShipMesh";
import { Alien } from "./Alien";

type TPlanetData = {
  name: string;
  scale: number;
  orbitRadius: number;
  rotationSpeed: number;
  orbitSpeed: number;
  textureUri: string;
};

const orbitBrake = 8;
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
            rotationSpeed={-0.005}
            color="gray"
          />
          <LegoRing
            scale={[1, 1, 1]}
            amount={15}
            radius={30}
            rotationSpeed={-0.005}
            color="gray"
          />
        </>
      )}
    </group>
  );
};
const AnimatedPersecution: React.FC = () => {
  const alienRef = useRef<THREE.Group>(null);
  const spaceshipRef = useRef<THREE.Group>(null);

  let time = 0;
  // Variables to randomize the motion

  const frequencyMultiplierRef = useRef<number>(Math.random() * 0.5 + 0.5); // between 0.5 and 1
  const magnitudeMultiplierRef = useRef<number>(Math.random() * 0.5 + 1); // between 1 and 1.5

  useFrame(() => {
    if (alienRef.current && spaceshipRef.current) {
      // Randomized sinusoidal motions
      const alienX =
        250 * Math.sin(time * frequencyMultiplierRef.current) +
        100 +
        50 * Math.sin(time * 2 * frequencyMultiplierRef.current);
      const alienZ =
        100 * Math.cos(time) * Math.sin(time * magnitudeMultiplierRef.current) +
        10 +
        50 * Math.sin(time * 3 * frequencyMultiplierRef.current);
      const alienY = 50 * Math.sin(time + Math.PI / 4) + 20; // A phase shift added here

      alienRef.current.position.set(alienX, alienY, alienZ);

      // ... (rest of the code remains unchanged)
      // Chase logic: Spaceship moves towards alien's position.
      const direction = new THREE.Vector3().subVectors(
        alienRef.current.position,
        spaceshipRef.current.position
      );

      direction.normalize();
      const chaseSpeed = 0.5; // Adjusted for the spaceship's chasing speed.
      direction.multiplyScalar(chaseSpeed);
      spaceshipRef.current.position.add(direction);

      // Make the spaceship look at the alien's position.
      spaceshipRef.current.lookAt(alienRef.current.position);

      // Randomly change parameters every few seconds
      if (time % 5 < 0.005) {
        // roughly every 5 seconds, adjust based on your frame rate
        frequencyMultiplierRef.current = Math.random() * 0.5 + 0.5;
        magnitudeMultiplierRef.current = Math.random() * 0.5 + 1;
      }

      time += 0.005;
    }
  });

  return (
    <group>
      <group ref={alienRef}>
        <Alien
          handleAlienHit={() => {
            console.log("Alien hit!");
          }}
          scale={[0.5, 0.5, 0.5]}
        />
      </group>
      <group ref={spaceshipRef}>
        <SpaceshipMesh rotation={[-Math.PI, 0, Math.PI]} scale={[10, 10, 10]} />
      </group>
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
      <PerspectiveCamera makeDefault position={[-60, 8, -13]} />
      <group scale={[0.45, 0.45, 0.45]}>
        <LegoRing
          scale={[2.5, 2.5, 2.5]}
          amount={50}
          radius={600}
          rotationSpeed={0.0001}
          color="gray"
        />
        <Stars
          radius={100}
          depth={200}
          count={900}
          factor={0.01}
          saturation={0}
        />

        <Sun />
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
      <AnimatedPersecution />

      <OrbitControls />
    </Canvas>
  );
};
