/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["mesh_avocado_01_-_Default001_0"]: THREE.Mesh;
  };
  materials: {
    ["01_-_Default.001"]: THREE.MeshBasicMaterial;
  };
};

export function Avocado(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/avocado.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["mesh_avocado_01_-_Default001_0"].geometry}
        material={materials["01_-_Default.001"]}
      />
    </group>
  );
}

useGLTF.preload("/avocado.glb");
