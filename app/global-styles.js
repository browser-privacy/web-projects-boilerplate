import { injectGlobal } from 'styled-components';

// @TODO: Refactor this to styled-components

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html, body { height: 100%; }

  #app {
    background-color: #fafafa;
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
