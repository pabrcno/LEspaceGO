/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["mesh_peach_01_-_Default001_0"]: THREE.Mesh;
  };
  materials: {
    ["01_-_Default.001"]: THREE.MeshBasicMaterial;
  };
};

export function Peach(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/peach.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["mesh_peach_01_-_Default001_0"].geometry}
        material={materials["01_-_Default.001"]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/peach.glb");
