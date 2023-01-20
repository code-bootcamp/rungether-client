import { css } from "@emotion/react";

export const globalStyles = css`
  background-image: url(/background.webp);
  background-size: cover;
  background-position-x: center;

  * {
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "AppleFont", "CodeNext", Helvetica, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @font-face {
    font-family: "AppleFont";
    src: url("/public/fonts/AppleFont/AppleSDGothicNeoM.ttf");
  }
  @font-face {
    font-family: "CodeNext";
    src: url("/public/fonts/CodeNext/Non-commercial/WEB/CodeNext-Trial-Regular.woff");
  }
  /* @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  } */
`;
