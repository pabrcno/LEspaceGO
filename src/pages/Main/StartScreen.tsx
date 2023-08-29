import { Loader } from "@react-three/drei";

import { FC, Suspense } from "react";

import {
  ControlsContainer,
  HintContainer,
  StartButton,
  TitleContainer,
} from "./main.styles";

import { Title } from "../../components/Title";

import { SolarSystem } from "../../components/SolarSystem";

interface StartScreenProps {
  setIsStarted: (value: boolean) => void;
  innerGradientColor: string;
  outerGradientColor: string;
}

export const StartScreen: FC<StartScreenProps> = ({ setIsStarted }) => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <Loader />
      <Suspense fallback={null}>
        <SolarSystem />
      </Suspense>
      <TitleContainer>
        <Title text="LE-SPACE-GO" />
      </TitleContainer>
      <StartButton onClick={() => setIsStarted(true)}>Start</StartButton>
      <ControlsContainer>
        <h2>Controls:</h2>
        <ul>
          <li>
            <h2>🖱️ to move</h2>
          </li>
          <li>
            <h2>👆 SPACE/CLICK to shoot</h2>
          </li>
          <li>
            <h2>⬆️ SHIFT to Hyper Speed</h2>
          </li>
        </ul>
      </ControlsContainer>

      <HintContainer>
        <h6>Hint: Shoot 13 aliens! 🛸</h6>
      </HintContainer>
    </div>
  );
};
