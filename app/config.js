module.exports = {
  test: {
    API_ENDPOINT: 'http://localhost:3000',
    RECAPTCHA_SITE_KEY: '',
  },
  development: {
    API_ENDPOINT: 'http://localhost:3000',
    RECAPTCHA_SITE_KEY: '',
  },
  production: {
    APP_PUBLIC_URL: 'https://domain.io',
    API_ENDPOINT:
      'https://x1pct1mfd7c.execute-api.us-east-1.amazonaws.com/prod',
    RECAPTCHA_SITE_KEY: '',
  },
};
