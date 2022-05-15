import { getTokenCookie, removeTokenCookie } from "../../../lib/cookies"

const TOKEN_NAME = 'passport-session'

export default async (req, res) => {
    const cookies = getTokenCookie(req);
    if(cookies[TOKEN_NAME]) removeTokenCookie(res, TOKEN_NAME);
    res.status(200).json({msg: {msgBody: "you have successfully logged out", msgError: false}, user: null})
}