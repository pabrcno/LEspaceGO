import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["mesh_melon_cut_2_01_-_Default001_0"]: THREE.Mesh;
  };
  materials: {
    ["01_-_Default.001"]: THREE.MeshBasicMaterial;
  };
};

export function MelonCut(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/melon_cut.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["mesh_melon_cut_2_01_-_Default001_0"].geometry}
        material={materials["01_-_Default.001"]}
      />
    </group>
  );
}

useGLTF.preload("/melon_cut.glb");
