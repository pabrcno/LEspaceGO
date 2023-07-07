import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["mesh_banana_01_-_Default001_0"]: THREE.Mesh;
  };
  materials: {
    ["01_-_Default.001"]: THREE.MeshBasicMaterial;
  };
};

export function Banana(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/banana.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["mesh_banana_01_-_Default001_0"].geometry}
        material={materials["01_-_Default.001"]}
      />
    </group>
  );
}

useGLTF.preload("/banana.glb");
