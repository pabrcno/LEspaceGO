import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";

import { Float, Loader, Stats } from "@react-three/drei";

import { ScreenContainer } from "../../styles/general.styles";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useTheme } from "../../hooks/useTheme";
import { SpaceShip } from "../../components/SpaceShip";
import { Planet } from "../../components/legos/Planet";
import { Alien } from "../../components/legos/Alien";
import { Suspense, useEffect, useRef, useState } from "react";

import { StartButton } from "./main.styles";
import { colors, textureUris } from "../../constants";

import { StartScreen } from "./StartScreen";

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
  const textures = useLoader(
    TextureLoader,
    Object.values(textureUris)
  ) as THREE.Texture[];

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
      <StartScreen
        setIsStarted={setIsStarted}
        innerGradientColor={innerGradientColor}
        outerGradientColor={outerGradientColor}
      />
    );
  }
  return (
    <ScreenContainer>
      {
        <>
          <Loader />
          <Stats />
          <Suspense fallback={null}>
            <Canvas
              style={{
                height: "100vh",
                background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
                zIndex: 0,
                cursor: "none",
              }}
            >
              <fog attach="fog" args={[shadowColor, 11, 13]} />

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

                  ...textures.map((texture, textureIndex) => (
                    <Planet
                      key={`${textureIndex}-planet`}
                      scale={bgMeshScale * Math.random() * 2}
                      texture={texture}
                    />
                  )),

                  ...Array.from({ length: 15 }, (_, factorIndex) => (
                    <Alien
                      key={`${factorIndex}-alien`}
                      scale={bgMeshScale * 2}
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
                  zIndex: 2,
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
            <source src="/background.wav" type="audio/mpeg" />
          </audio>
        </>
      }
    </ScreenContainer>
  );
};
