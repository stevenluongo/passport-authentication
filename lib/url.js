const PROD_URL = process.env.PROD_URL;
// const DEV_URL = 'http://localhost:3000';
const DEV_URL =
  'https://juxtasolutions-next-js-passport-auth-grq7xq96r7rfvx54-3000.githubpreview.dev/';
export const base_url =
  process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
