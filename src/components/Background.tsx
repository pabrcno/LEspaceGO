import { ReactElement } from "react";
import { useThree } from "@react-three/fiber";

import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { useAutoZScrolling } from "../hooks/useAutoZScroll";

type MeshProps = {
  scale: number;
  position?: [number, number, number];
};

type meshBackgroundProps = {
  meshes: ReactElement<MeshProps>[];
  deactivateScroll?: boolean;
};

export const Background = ({
  meshes,
  deactivateScroll,
}: meshBackgroundProps) => {
  const positionedMeshes = useMeshBackgroundPositioning(meshes);
  const { speed, rotationIntensity, floatIntensity } = {
    speed: 0.1,
    rotationIntensity: 3,
    floatIntensity: 5,
  };
  const { speed: scrollSpeed } = useAutoZScrolling(deactivateScroll);

  const { camera } = useThree();

  const cameraFactor = Math.abs(camera.position.z) / 5 + 2;

  return (
    <group>
      <directionalLight intensity={1} />
      {positionedMeshes.map((mesh, index) => (
        <Float
          speed={speed}
          rotationIntensity={
            rotationIntensity / cameraFactor + (speed > 0.1 ? 10 : 0)
          }
          floatIntensity={floatIntensity}
          key={index}
          floatingRange={[-0.1, 0.1]}
        >
          {mesh}
        </Float>
      ))}
      <ambientLight intensity={0.3} />
      <Sparkles
        position={[0, 0, camera.position.z - 10]}
        size={3}
        count={100}
        speed={scrollSpeed * 10}
        noise={1}
        scale={20}
      />
      <Stars
        radius={100}
        depth={500}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </group>
  );
};
