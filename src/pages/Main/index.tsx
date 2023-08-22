import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";

import { Float, Loader, Sparkles, Stats } from "@react-three/drei";

import { ScreenContainer } from "../../styles/general.styles";

import { useTheme } from "../../hooks/useTheme";
import { SpaceShip } from "../../components/SpaceShip";
import { Planet } from "../../components/legos/Planet";
import { Alien } from "../../components/legos/Alien";
import { Suspense, useEffect, useRef, useState } from "react";
import { Lego2x2 } from "../../components/legos";
import { ControlsContainer, HintContainer, StartButton } from "./main.styles";
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
    audioRef.current.volume = 1;

    audioRef.current.play().catch((err) => console.error(err));
  }, [isStarted]); //

  if (!isStarted) {
    return (
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <Loader />

        <Canvas
          style={{
            background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Float rotation={[Math.PI / 16, Math.PI, 0]}>
              <Lego2x2
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
                color={colors[Math.floor(Math.random() * colors.length)]}
              />
            </Float>
            <Sparkles position={[0, 0, 1]} />
          </Suspense>
        </Canvas>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>LESPACEGO</h1>
        </div>
        <StartButton onClick={() => setIsStarted(true)}>Start</StartButton>
        <ControlsContainer>
          <h2>Controls:</h2>
          <ul>
            <li>
              <h2>🖱️ to move</h2>
            </li>
            <li>
              <h2>👆 CLICK/SPACE to shoot</h2>
            </li>
            <li>
              <h2>⬆️ SHIFT to Hyper Speed</h2>
            </li>
          </ul>
        </ControlsContainer>

        <HintContainer>
          <h6>Hint: Shoot 10 aliens to get a reward! 👽</h6>
        </HintContainer>
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
              cursor: "none",
            }}
          >
            <Suspense fallback={null}>
              <Stats />
              <fog attach="fog" args={[shadowColor, 8, 11]} />

              <SpaceShip />

              <Background
                meshes={[
                  ...theme.meshes.flatMap((Mesh, index) => [
                    ...Array.from(
                      { length: bgMeshFactor },
                      (_, factorIndex) => (
                        <Mesh
                          key={`${index}-${factorIndex}`}
                          scale={[
                            bgMeshScale * 0.5,
                            bgMeshScale * 0.5,
                            bgMeshScale * 0.5,
                          ]}
                          color={
                            colors[Math.floor(Math.random() * colors.length)]
                          }
                        />
                      )
                    ),
                  ]),

                  ...textureUris.map((texture, textureIndex) => (
                    <Planet
                      key={`${textureIndex}-planet`}
                      scale={bgMeshScale * 1.5}
                      textureUri={texture}
                    />
                  )),

                  ...Array.from({ length: 20 }, (_, factorIndex) => (
                    <Alien key={`${factorIndex}-alien`} scale={bgMeshScale} />
                  )),
                ]}
              />
            </Suspense>
          </Canvas>

          <audio ref={audioRef} loop>
            <source src="/sound/background.wav" type="audio/mpeg" />
          </audio>
        </>
      }
    </ScreenContainer>
  );
};
