import { useGLTF, useTexture } from "@react-three/drei";
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
const textureUris = [
  "/textures/Planet_Caves.jpg",
  "/textures/Planet_City.jpg",
  "/textures/Planet_Cliffs.jpg",
  "/textures/Planet_Desert.jpg",
  "/textures/Planet_Forest.jpg",
  "/textures/Planet_Ice.jpg",
  "/textures/Planet_Lava.jpg",
  "/textures/Planet_Lava.jpg",
  "/textures/Planet_Snow.jpg",
  "/textures/Planet_TropicalValley.jpg",
];
export function Planet(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/meshes/planet.glb") as GLTFResult;
  const texture = useTexture(
    textureUris[Math.floor(Math.random() * textureUris.length)]
  );
  const clonedMaterial = materials["blue_and_green_planet"].clone();

  // Update the material's color if a color prop is provided
  if (texture) {
    clonedMaterial.map = texture;
  }

  return (
    <group {...props} dispose={null}>
      <AnimatedLegoWrapper>
        <mesh castShadow receiveShadow geometry={nodes.planet_lego.geometry}>
          <meshStandardMaterial map={texture} />
        </mesh>
      </AnimatedLegoWrapper>
    </group>
  );
}

useGLTF.preload("/planet.glb");
