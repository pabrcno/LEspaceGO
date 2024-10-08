import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";

import { Loader } from "@react-three/drei";

import { ScreenContainer } from "../../styles/general.styles";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useTheme } from "../../hooks/useTheme";
import { SpaceShip } from "../../components/SpaceShip";
import { Planet } from "../../components/Planet";
import { Alien } from "../../components/Alien";
import { Suspense, useEffect, useRef, useState } from "react";

import { colors, textureUris } from "../../constants";

import { StartScreen } from "./StartScreen";

import { useSnackbar } from "notistack";
import { DownloadButton } from "./main.styles";
import { SquidMesh } from "../../components/SquidMesh";

export const MainScreen = () => {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/alien.glb";
    downloadLink.download = "alien.glb";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const showNotification = () => {
    enqueueSnackbar("Great! You won a reward! 🎊", {
      variant: "success",
      autoHideDuration: 10000,
      action: (key) => (
        <>
          <DownloadButton
            onClick={() => {
              handleClick();
              closeSnackbar(key);
            }}
          >
            Download
          </DownloadButton>
        </>
      ),
    });
  };

  const {
    bgMeshScale,
    bgMeshFactor,
    innerGradientColor,
    outerGradientColor,
    shadowColor,
  } = {
    bgMeshScale: 0.1,
    bgMeshFactor: 12,
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

  // const [isKraken, setIsKraken] = useState(false);
  const handleAlienCount = () => {
    alienCountRef.current += 1;
    if (alienCountRef.current === 13) {
      showNotification();
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

          <Suspense fallback={null}>
            <Canvas
              style={{
                height: "100vh",
                background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
                zIndex: 0,
                cursor: "none",
              }}
            >
              <fog attach="fog" args={[shadowColor, 11, 15]} />

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

                  ...Array.from({ length: 10 }, (_, factorIndex) => (
                    <Alien
                      key={`${factorIndex}-alien`}
                      scale={bgMeshScale * 1.5}
                      handleAlienHit={handleAlienCount}
                    />
                  )),
                  ...Array.from({ length: 6 }, (_, factorIndex) => (
                    <SquidMesh
                      key={`${factorIndex}-squid`}
                      scale={[0.005, 0.005, 0.005]}
                    />
                  )),
                ]}
              />
            </Canvas>
          </Suspense>

          <audio ref={audioRef} loop>
            <source src="/background.mp3" type="audio/mpeg" />
          </audio>
        </>
      }
       <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "18px",
              zIndex: 100,
              userSelect: "none"
            }}
          >
            Aliens killed: {alienCountRef.current}
          </div>
    </ScreenContainer>
  );
};
