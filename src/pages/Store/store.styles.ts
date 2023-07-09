import styled from "styled-components";

export const ProductActionButton = styled.button`
  font-family: "Lobster", cursive;
  font-size: 6rem;
  color: #ffff;
  text-align: center;
  background-color: transparent;

  letter-spacing: 0.1rem;
  border: none;
  border-radius: 50%;
  padding: 0rem 1.5rem;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-focus-ring-color: transparent;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ProductNavigationLeftContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 1%;
`;

export const ProductNavigationRightContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 1%;
`;

export const ProductAmountControlContainer = styled.div`
  position: absolute;
  top: 20%;

  border-radius: 10rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0001;
`;

export const ProductAmountCounter = styled.h2`
  font-family: "Lobster", cursive;
  font-size: 3rem;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 0;
  letter-spacing: 0.1rem;
`;
