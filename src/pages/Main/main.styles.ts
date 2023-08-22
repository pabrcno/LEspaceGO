import styled from "styled-components";

export const ControlsContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  bottom: 0;
  left: 0;
  padding: 20;
  cursor: pointer;
`;

export const StartButton = styled.button`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 50px;
  fontsize: 2rem;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 2px solid white;
  borderradius: 10px;
`;
