module.exports = {
  test: {
    API_ENDPOINT: 'http://localhost:3000',
    RECAPTCHA_SITE_KEY: '6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF',
  },
  development: {
    API_ENDPOINT: 'http://localhost:3000',
    RECAPTCHA_SITE_KEY: '6LeJVnEUAAAAAAetIUT8Rb7yQJx8LquVS2EFQNvF',
  },
  production: {
    APP_PUBLIC_URL: 'https://domain.io',
    API_ENDPOINT: 'https://api.domain.io',
    RECAPTCHA_SITE_KEY: 'FOO',
  },
};
