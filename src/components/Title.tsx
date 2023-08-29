import React from "react";
import styled from "styled-components";
import { colors } from "../constants";

const ColorfulSpan = styled.span<{ color?: string }>`
  color: ${(props) => props.color || "black"};
`;

interface ColorfulH1Props {
  text: string;
}

export const Title: React.FC<ColorfulH1Props> = ({ text }) => {
  return (
    <h2>
      {text.split("").map((char, index) => (
        <ColorfulSpan key={index} color={colors[index % colors.length]}>
          {char}
        </ColorfulSpan>
      ))}
    </h2>
  );
};
