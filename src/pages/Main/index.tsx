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
import {
  ControlsContainer,
  HintContainer,
  StartButton,
  TitleContainer,
} from "./main.styles";
import { colors } from "../../constants";
import { Title } from "../../components/Title";

const textureUris = [
  "/textures/earth.jpg",
  "/textures/jupiter.jpg",
  "/textures/mars.jpg",
  "/textures/mercury.jpg",
  "/textures/neptune.jpg",
  "/textures/saturn.jpg",
  "/textures/uranus.jpg",
  "/textures/venus.jpg",
];
export const MainScreen = () => {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);

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
    if (!audioRef.current) return;
    audioRef.current.volume = 1;

    audioRef.current.play().catch((err) => console.error(err));
  }, [isStarted]); //

  const alienCountRef = useRef(0);
  const [showReward, setShowReward] = useState(false);
  const handleAlienCount = () => {
    alienCountRef.current += 1;
    if (alienCountRef.current === 13) {
      setShowReward(true);
    }
  };

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
        <TitleContainer>
          <Title text="LESPACEGO" />
        </TitleContainer>
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
          <h6>Hint: Shoot 13 aliens to get a reward! 👽</h6>
        </HintContainer>
      </div>
    );
  }
  return (
    <ScreenContainer>
      {
        <>
          <Loader />

          <Suspense fallback={null}>
            <Canvas
              style={{
                height: "100vh",
                background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
                zIndex: 0,
                cursor: "none",
              }}
            >
              <fog attach="fog" args={[shadowColor, 7, 9]} />

              <SpaceShip />

              <Background
                meshes={[
                  ...theme.meshes.flatMap((Mesh, index) => [
                    ...Array.from(
                      { length: bgMeshFactor },
                      (_, factorIndex) => (
                        <Mesh
                          key={`${index}-${factorIndex}`}
                          scale={(() => {
                            const scale = Math.random() * bgMeshScale;
                            return [scale, scale, scale] as [
                              number,
                              number,
                              number
                            ];
                          })()}
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
                      scale={bgMeshScale * Math.random() * 2}
                      textureUri={texture}
                    />
                  )),

                  ...Array.from({ length: 15 }, (_, factorIndex) => (
                    <Alien
                      key={`${factorIndex}-alien`}
                      scale={bgMeshScale}
                      handleAlienHit={handleAlienCount}
                    />
                  )),
                ]}
              />
            </Canvas>
          </Suspense>
          {showReward && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",

                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Canvas>
                  <Suspense fallback={null}>
                    <ambientLight />
                    <directionalLight position={[0, 2, 0]} />
                    <Float>
                      <group scale={[1.2, 1.2, 1.2]}>
                        <Alien
                          handleAlienHit={() => {
                            return;
                          }}
                        />
                      </group>
                    </Float>
                  </Suspense>
                </Canvas>
                <h1>🎉 Congrats! You won a reward! 🎉</h1>
                <div
                  style={{
                    marginTop: 100,
                  }}
                >
                  <a href="/meshes/alien.glb" download>
                    <StartButton> Get</StartButton>
                  </a>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",

                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <StartButton onClick={() => setShowReward(false)}>
                  Close
                </StartButton>
              </div>
            </>
          )}
          <audio ref={audioRef} loop>
            <source src="/sound/background.wav" type="audio/mpeg" />
          </audio>
        </>
      }
    </ScreenContainer>
  );
};
