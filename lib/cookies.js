import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'passport-session';

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  return cookie;
}

export function removeTokenCookie(res, tokenName) {
  const cookie = serialize(tokenName, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req);
  if (Object.keys(cookies).length === 0) {
    return null;
  }

  return cookies;
}
