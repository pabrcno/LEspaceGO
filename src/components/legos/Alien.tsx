/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useFrame } from "@react-three/fiber";
import { Explosion } from "../Explosion";
import { a, useSpring } from "@react-spring/three";
type GLTFResult = GLTF & {
  nodes: {
    Object_1: THREE.Mesh;
    Object_1_1: THREE.Mesh;
    Object_1_2: THREE.Mesh;
  };
  materials: {
    DarkMetal: THREE.MeshStandardMaterial;
    LightMEtal: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
  };
};

export function Alien(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/meshes/alien.glb") as GLTFResult;
  const [isHit, setIsHit] = useState(false);
  const alienRef = useRef<THREE.Group>();
  const raycaster = new THREE.Raycaster();
  const { alienScale, explosionScale } = useSpring({
    alienScale: isHit ? [0, 0, 0] : [1, 1, 1], // Shrinking effect
    explosionScale: isHit ? [1, 1, 1] : [0, 0, 0], // Explosion effect
    config: { duration: 500, tension: 1000, friction: 5000 }, // Duration of animation
  });
  const explosionAudio = useMemo(() => new Audio("/sound/explosion.wav"), []);
  explosionAudio.volume = 0.5;
  useFrame(({ scene }) => {
    // If already hit, no need to check further
    if (isHit) return;

    if (alienRef.current) {
      const lasers = scene.children.filter((child) => child.name === "laser"); // Name your lasers 'laser' when creating them for easy filtering
      for (const laser of lasers) {
        raycaster.set(laser.position, new THREE.Vector3(0, 0, -1));
        const intersects = raycaster.intersectObject(alienRef.current, true); // true checks all children of the group
        if (intersects.length > 0) {
          explosionAudio.play().catch((err) => console.error(err));
          setIsHit(true);

          scene.remove(laser);
          setTimeout(() => {
            alienRef.current?.parent?.remove(alienRef.current);
          }, 2000);

          break;
        }
      }
    }
  });

  return (
    <group {...props} dispose={null} ref={alienRef as React.Ref<THREE.Group>}>
      <a.group scale={alienScale as unknown as THREE.Vector3}>
        <mesh
          geometry={nodes.Object_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          geometry={nodes.Object_1_1.geometry}
          material={materials.LightMEtal}
        />
        <mesh geometry={nodes.Object_1_2.geometry} material={materials.Glass} />
      </a.group>
      <a.group scale={explosionScale as unknown as THREE.Vector3}>
        <Explosion />
      </a.group>
    </group>
  );
}

useGLTF.preload("/alien.glb");
