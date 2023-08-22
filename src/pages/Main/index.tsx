import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";

import { Loader, Stats } from "@react-three/drei";

import { ScreenContainer } from "../../styles/general.styles";

import { useTheme } from "../../hooks/useTheme";
import { SpaceShip } from "../../components/SpaceShip";
import { Planet } from "../../components/legos/Planet";
import { Alien } from "../../components/legos/Alien";
import { Suspense } from "react";

export const MainScreen = () => {
  const { theme } = useTheme();
  const {
    bgMeshScale,
    bgMeshFactor,
    innerGradientColor,
    outerGradientColor,
    shadowColor,
  } = {
    bgMeshScale: 0.1,
    bgMeshFactor: 15,
    innerGradientColor: theme.innerGradientColor,
    outerGradientColor: theme.outerGradientColor,
    shadowColor: theme.shadowColor,
  };

  const colors = [
    "#B40000",
    "#FCAC00",
    "#00852B",
    "#1E5AA8",
    "#069D9F",
    "#D05098",
  ];

  return (
    <ScreenContainer>
      <Canvas
        style={{
          height: "100vh",
          background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <Stats />
          <fog attach="fog" args={[shadowColor, 8, 11]} />
          <directionalLight intensity={1} />

          <SpaceShip />

          <Background
            meshes={theme.meshes.flatMap((Mesh, index) => [
              ...Array.from({ length: bgMeshFactor }, (_, factorIndex) => (
                <Mesh
                  key={`${index}-${factorIndex}`}
                  scale={[
                    bgMeshScale * 0.2,
                    bgMeshScale * 0.2,
                    bgMeshScale * 0.2,
                  ]}
                  color={colors[Math.floor(Math.random() * colors.length)]}
                />
              )),

              ...Array.from({ length: 8 }, (_, factorIndex) => (
                <Planet
                  key={`${index}-${factorIndex}-planet`}
                  scale={bgMeshScale}
                />
              )),

              ...Array.from({ length: 24 }, (_, factorIndex) => (
                <Alien
                  key={`${index}-${factorIndex}-alien`}
                  scale={bgMeshScale / 1.5}
                />
              )),
            ])}
          />
        </Suspense>
      </Canvas>
      <Loader />
      {/* <ControlsContainer>
        <Controls />
      </ControlsContainer> */}
    </ScreenContainer>
  );
};
