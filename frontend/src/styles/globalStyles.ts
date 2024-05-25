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
    background-color: #f0f0f0;
    color: #333;
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

  /* 기타 전역 스타일 */
`;

export default GlobalStyle;
