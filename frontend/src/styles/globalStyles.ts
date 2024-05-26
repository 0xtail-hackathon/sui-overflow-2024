import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 브라우저 기본 스타일 초기화 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* HTML, body 태그 기본 스타일 설정 */
  html, body {
    height: 100%;
    font-size: 16px; // root font size (rem 기준값 설정)
    font-family: 'Arial', sans-serif;
    color: #333;
  }

  html {
    width: 100vw;
    background-color: ${({ theme }) => theme.colors.bg};
  }

  body {
    width: 100%;
    overflow-x: hidden;
  }


  /* 공통 링크 스타일 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 공통 리스트 스타일 */
  ul {
    list-style: none;
  }

  /* Suiet Wallet 스타일 */
  .wkit-button {
      display: flex;
      gap: 10px;
      width: 100% !important;
      height: 40px !important;
      border-radius: 8px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      color: ${({ theme }) => theme.colors.black} !important;
      background-color: ${({ theme }) => theme.colors.secondary} !important;

      &:hover {
          background-color: ${({ theme }) => theme.colors.primary} !important;
          color: ${({ theme }) => theme.colors.white} !important;
          > svg {
              fill: ${({ theme }) => theme.colors.white} !important;
          }
      }

      > svg {
          height: 20px !important;
          width: 20px !important;
          fill: ${({ theme }) => theme.colors.gray} !important;
      }
  }

  .wkit-connected-button {
      height: 40px !important;
      background-color: ${({ theme }) => theme.colors.secondary} !important;
      color: ${({ theme }) => theme.colors.black} !important;
      display: flex !important;
      align-items: center !important;
      padding: 0 !important;
      border-radius: 8px !important;

      &:hover {
          background-color: ${({ theme }) => theme.colors.primary} !important;
          color: ${({ theme }) => theme.colors.white} !important;
      }

      .wkit-connected-button__balance,
      .wkit-address-select {
          color: inherit !important;
      }

      .wkit-connected-button__divider {
          background-color: ${({ theme }) => theme.colors.gray} !important;
      }
  }

  .wkit-disconnect-button__container {
      position: absolute !important;
      top: 50px !important;
      right: 0 !important;
      width: 100% !important;
      background-color: ${({ theme }) => theme.colors.white} !important;
      padding: 0 !important;
      height: 40px !important;

      .wkit-disconnect-button {
          padding:0 !important;
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
          background-color: ${({ theme }) => theme.colors.secondary} !important;
          color: ${({ theme }) => theme.colors.black} !important;
          border-radius: 8px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 10px !important;
          white-space: nowrap !important;
          font-weight: inherit !important;

          &:hover {
              background-color: ${({ theme }) =>
                  theme.colors.primary} !important;
              color: ${({ theme }) => theme.colors.white} !important;
          }
      }
  }
`;

export default GlobalStyle;
