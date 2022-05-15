const PROD_URL = process.env.PROD_URL;
const DEV_URL = 'http://localhost:3000';
export const base_url = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;