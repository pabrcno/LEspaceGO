import { createGlobalStyle } from "styled-components";
import VCR from "../../assets/fonts/VCR.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'VCR';
    src: url(${VCR}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
    letter-spacing: 1em; 
    
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
    overflow-y: hidden;
    font-family: 'VCR', sans-serif;
    color: white;
 
  }
`;

export default GlobalStyle;
