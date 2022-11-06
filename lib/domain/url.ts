const PROD_URL = process.env.PROD_URL;
const DEV_URL = "https://stevenluongo-glorious-barnacle-6ww66qrvjp34x4x-3000.preview.app.github.dev";

export const baseURL =
  process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;