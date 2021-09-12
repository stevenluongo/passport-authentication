import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const tokens = getTokenCookie(req)
  if (!tokens) return
  
  //check for github session
  if(tokens['passportSession']) {
    const token = tokens['passportSession']
    const serializedCookie = JSON.parse(Buffer.from(token, 'base64').toString());
    const user = serializedCookie.passport.user;
    const session = {
      _doc: {
        id: user.id
      }
    }
    return session;
  }

  //passport-local session
  const token = tokens['token'];

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session;
}