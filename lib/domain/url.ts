const PROD_URL = process.env.PROD_URL;
const DEV_URL =
  'https://stevenluongo-vigilant-acorn-xpwvrw6x9v92v5rv-3000.preview.app.github.dev';

export const baseURL =
  process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
