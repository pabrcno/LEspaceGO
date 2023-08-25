import { Suspense, FC, ReactElement } from "react";
// You might need to adjust the imports depending on your setup and what you're using.
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Alien } from "./Alien";
import styled from "styled-components";

export const RewardButton = styled.button`
  position: absolute;
  font-family: "VCR", sans-serif;

  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 50px;
  font-size: 2em;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 20px;
`;

interface RewardModalProps {
  setShowReward?: (show: boolean) => void;
}

const RewardModal: FC<RewardModalProps> = ({ setShowReward }): ReactElement => {
  return (
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
          <a href="/alien.glb" download>
            <RewardButton> Get</RewardButton>
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
        <RewardButton onClick={() => setShowReward && setShowReward(false)}>
          Close
        </RewardButton>
      </div>
    </>
  );
};

export default RewardModal;
