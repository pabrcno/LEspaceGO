/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: HansWurschd (https://sketchfab.com/HansWurschd)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lego-space-dart-i-2fc7d4ad36ed451d8cb5256de50d4b28
Title: LEGO Space Dart I
*/
import * as THREE from "three";
import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["26-material018_1"]: THREE.Mesh;
    ["26-material018_2"]: THREE.Mesh;
    ["26-material018_3"]: THREE.Mesh;
    ["26-material018_4"]: THREE.Mesh;
    ["26-material018_5"]: THREE.Mesh;
    ["26-material018_6"]: THREE.Mesh;
    ["26-material018_7"]: THREE.Mesh;
    ["26-material018_8"]: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    material_5: THREE.MeshStandardMaterial;
    ["233814d130"]: THREE.MeshStandardMaterial;
    material_1: THREE.MeshStandardMaterial;
    ["243626d154"]: THREE.MeshStandardMaterial;
    material_4: THREE.MeshStandardMaterial;
    material_3: THREE.MeshStandardMaterial;
    material_2: THREE.MeshStandardMaterial;
  };
};

export const SpaceshipMesh = forwardRef(
  (props: JSX.IntrinsicElements["group"], ref) => {
    const { nodes, materials } = useGLTF(
      "/LEGO_SPACESHIP_LP.glb"
    ) as GLTFResult;
    return (
      <group {...props} dispose={null}>
        <group
          ref={ref as React.Ref<THREE.Group>}
          rotation={[-Math.PI / 2, Math.PI, 0]}
          scale={[0.003, 0.003, 0.003]}
        >
          <mesh
            geometry={nodes["26-material018_1"].geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes["26-material018_2"].geometry}
            material={materials.material_5}
          />
          <mesh
            geometry={nodes["26-material018_3"].geometry}
            material={materials["233814d130"]}
          />
          <mesh
            geometry={nodes["26-material018_4"].geometry}
            material={materials.material_1}
          />
          <mesh
            geometry={nodes["26-material018_5"].geometry}
            material={materials["243626d154"]}
          />
          <mesh
            geometry={nodes["26-material018_6"].geometry}
            material={materials.material_4}
          />
          <mesh
            geometry={nodes["26-material018_7"].geometry}
            material={materials.material_3}
          />
          <mesh
            geometry={nodes["26-material018_8"].geometry}
            material={materials.material_2}
          />
        </group>
      </group>
    );
  }
);

useGLTF.preload("/LEGO_SPACESHIP_LP.glb");
