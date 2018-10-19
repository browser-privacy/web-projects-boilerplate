import { injectGlobal } from 'styled-components';

// @TODO: Refactor this to styled-components

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    margin-bottom: 313px; /* Margin bottom by footer height */
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px; /* Set the fixed height of the footer here */
    line-height: 60px; /* Vertically center the text there */
  }

  #app {
    background-color: #f2a6a6;
  }

  .beta-icon {
    margin-left: 12px;
    background-color: rgb(57, 131, 250);
    font-weight: 600;
    font-size: 13px;
    color: white;
    padding: 4px 9px;
    border-radius: 16px;
  }

  .grecaptcha-badge {
    display: none;
  }
`;
