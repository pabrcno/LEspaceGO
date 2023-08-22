import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";

import { Float, Loader, Sparkles, Stats } from "@react-three/drei";

import { ScreenContainer } from "../../styles/general.styles";

import { useTheme } from "../../hooks/useTheme";
import { SpaceShip } from "../../components/SpaceShip";
import { Planet } from "../../components/legos/Planet";
import { Alien } from "../../components/legos/Alien";
import { Suspense, useEffect, useRef, useState } from "react";
import { Lego4x2 } from "../../components/legos";
const colors = [
  "#B40000",
  "#FCAC00",
  "#00852B",
  "#1E5AA8",
  "#069D9F",
  "#D05098",
];

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
export const MainScreen = () => {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioMelodyRef = useRef<HTMLAudioElement>(null);
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
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    if (!audioRef.current || !audioMelodyRef.current) return;
    audioRef.current.volume = 0.01;
    audioMelodyRef.current.volume = 0.1;
    audioRef.current.play().catch((err) => console.error(err));
    audioMelodyRef.current.play().catch((err) => console.error(err));
  }, [isStarted]); //

  if (!isStarted) {
    return (
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <Canvas
          style={{
            background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Float>
            <Lego4x2
              position={[0, 0, 0]}
              scale={[0.5, 0.5, 0.5]}
              color="blue"
            />
          </Float>
          <Sparkles position={[0, 0, 1]} />
        </Canvas>

        <button
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "1.2rem",
          }}
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      </div>
    );
  }
  return (
    <ScreenContainer>
      {
        <>
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
                        bgMeshScale * 0.3,
                        bgMeshScale * 0.3,
                        bgMeshScale * 0.3,
                      ]}
                      color={colors[Math.floor(Math.random() * colors.length)]}
                    />
                  )),
                  ...textureUris.map((texture, textureIndex) => (
                    <Planet
                      key={`${index}-${textureIndex}-planet`}
                      scale={bgMeshScale}
                      textureUri={texture}
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
          <audio ref={audioRef} loop>
            <source src="/sound/background.wav" type="audio/mpeg" />
          </audio>
          <audio ref={audioMelodyRef} loop>
            <source src="/sound/background-melody.mp3" type="audio/mpeg" />
          </audio>
        </>
      }
    </ScreenContainer>
  );
};
