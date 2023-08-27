import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useLerp } from "../hooks/useLerp";
import { useLaserIntersection } from "../hooks/useLaserIntersection";

type GLTFResult = GLTF & {
  nodes: {
    Object_1: THREE.Mesh;
    Object_1_1: THREE.Mesh;
  };
  materials: {
    defaultMat: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function Kraken(
  props: JSX.IntrinsicElements["group"] & { show: boolean }
) {
  const { nodes, materials } = useGLTF("/kraken.glb") as GLTFResult;
  const hitsRef = useRef(0);
  const krakenRef = useLerp({
    offsetY: 0,
    factor: 0.005,
  });

  const hitsToKill = 2;
  const raycaster = new THREE.Raycaster();

  useFrame(({ camera, scene }) => {
    if (!krakenRef.mainBoxRef.current) return;

    const desiredPosition = camera.position.z - 8;
    const hiddenPosition = camera.position.z - 40;

    // Check if Kraken has reached the desired position
    const hasReachedDesiredPosition =
      krakenRef.mainBoxRef.current.position.z <= desiredPosition;
    if (props.show && hitsRef.current < hitsToKill) {
      krakenRef.mainBoxRef.current.visible = true;
    }
    if (props.show && !hasReachedDesiredPosition) {
      // make visible

      // Move the Kraken closer to the desired position
      krakenRef.mainBoxRef.current.position.z += 1;

      // Ensure Kraken doesn't overshoot the desired position
      if (
        krakenRef.mainBoxRef.current.position.z > desiredPosition &&
        hitsRef.current < hitsToKill
      ) {
        krakenRef.mainBoxRef.current.position.z = desiredPosition;
        const lasers = scene.children.filter((child) => child.name === "laser");
        for (const laser of lasers) {
          raycaster.set(laser.position, new THREE.Vector3(0, 0, -1));
          const intersects = raycaster.intersectObject(
            krakenRef.mainBoxRef.current,
            true
          );
          if (intersects.length > 0 && intersects[0].distance < 0.1) {
            hitsRef.current += 1;
            scene.remove(laser);
            if (hitsRef.current === hitsToKill) {
              console.log("Kraken killed");

              krakenRef.mainBoxRef.current.visible = false;
            }
            break;
          }
        }
      }
    } else if (!props.show) {
      // make invisible

      krakenRef.mainBoxRef.current.position.z = hiddenPosition;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group
        ref={krakenRef.mainBoxRef as React.Ref<THREE.Group>}
        rotation={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_1.geometry}
          material={materials.defaultMat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_1_1.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/kraken.glb");
