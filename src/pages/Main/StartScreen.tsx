import { Canvas, useLoader } from "@react-three/fiber";

import { Float, Loader, Sparkles } from "@react-three/drei";

import { FC, Suspense } from "react";
import { Lego2x2 } from "../../components/legos";
import {
  ControlsContainer,
  HintContainer,
  StartButton,
  TitleContainer,
} from "./main.styles";

import { Title } from "../../components/Title";
import { colors, textureUris } from "../../constants";
import { TextureLoader } from "three";
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
};
