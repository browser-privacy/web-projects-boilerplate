import { injectGlobal } from 'styled-components';

// @TODO: Refactor this to styled-components

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    margin-bottom: 60px;
  }

  .app-container {
    padding-top: 40px;
  }

  /* NAVBAR */
  .navbar-nav .dropdown-menu {
    position: absolute !important;
  }
  .navbar-brandname {
    color: #fff;
    display: unset !important;
    padding: 0 !important;
  }
  .navbar-user-icon {
    color: white;
  }

  .navbar-user-username {
    margin-left: 8px;
    color: #d3d3d3;
  }

  /*HOMEPAGE*/
  .homepage-intro-header {
    font-size: 45px;
    line-height: 49px;
    font-weight: 300;
    margin-bottom: 16px;
  }
  .homepage-intro-text {
    font-size: 21px;
    line-height: 1.4;
    font-weight: 300;
    margin-bottom: 24px;
  }
  .homepage-intro-cta {
    margin: 0 8px;
    width: 197px;
    margin-top: 4px;
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

  /* LOGIN PAGE */
  .form-page {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-page .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-page .form-control:focus {
    z-index: 2;
  }
  .form-page input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-page input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  /* REGISTER PAGE */
  .register-page-recaptcha-col > div {
    display: inline-block;
  }
  .register-page-recaptcha-modal-header {
    justify-content: center !important;
  }

  /* FOOTER */
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 60px;
    line-height: 60px; /* Vertically center the text there */
  }
  .footer-text {
    font-size: 14px;
  }
  .footer-link {
    color: #fff;
  }

  .auth-container  {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .grecaptcha-badge {
    display: none;
  }
`;
