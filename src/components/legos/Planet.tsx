import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { AnimatedLegoWrapper } from "./AnimatedLegoWrapper";

type GLTFResult = GLTF & {
  nodes: {
    planet_lego: THREE.Mesh;
  };
  materials: {
    blue_and_green_planet: THREE.MeshStandardMaterial;
  };
};
export function Planet(
  props: JSX.IntrinsicElements["group"] & { texture: THREE.Texture }
) {
  const { nodes, materials } = useGLTF("/planet.glb") as GLTFResult;

  // Clone the material and set the map to the provided texture
  const clonedMaterial = materials["blue_and_green_planet"].clone();
  clonedMaterial.map = props.texture;

  return (
    <group {...props} dispose={null}>
      <AnimatedLegoWrapper>
        <mesh geometry={nodes.planet_lego.geometry}>
          {/* Use the cloned material with the updated texture */}
          <primitive object={clonedMaterial} />
        </mesh>
      </AnimatedLegoWrapper>
    </group>
  );
}

useGLTF.preload("/planet.glb");
