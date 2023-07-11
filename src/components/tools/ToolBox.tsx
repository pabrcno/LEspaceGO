/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["Box002_Material_#32_0"]: THREE.Mesh;
  };
  materials: {
    Material_32: THREE.MeshStandardMaterial;
  };
};

export function ToolBox(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/toolbox.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["Box002_Material_#32_0"].geometry}
        material={materials.Material_32}
      />
    </group>
  );
}

useGLTF.preload("/toolbox.glb");
