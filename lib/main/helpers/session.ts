import Iron from '@hapi/iron';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(session) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);
  const cookie = setTokenCookie(token);
  return cookie;
}

export async function getLoginSession(req) {
  const tokens = getTokenCookie(req);
  if (!tokens) return;

  if (tokens['passport-session']) {
    //passport-local session
    const token = tokens['passport-session'];

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) {
      throw new Error('Session expired');
    }

    return session;
  }

  return;
}
