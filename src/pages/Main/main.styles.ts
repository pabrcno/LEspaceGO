import styled from "styled-components";

export const ControlsContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  bottom: 0;
  left: 0;
  padding: 20;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px 50px;
  @media (max-width: 768px) {
    z-index: -1;
    opacity: 0;
  }
`;

export const StartButton = styled.button`
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

export const HintContainer = styled.div`
  position: absolute;
  font-family: "VCR", sans-serif;

  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 1.5em;

  background: transparent;
  color: white;
  rotate: 180deg;
  opacity: 0.5;
  border-radius: 20px;
  @media (max-width: 768px) {
    z-index: -1;
    opacity: 0;
  }
`;

export const TitleContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
