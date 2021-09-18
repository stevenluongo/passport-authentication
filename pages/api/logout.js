import { getTokenCookie, removeTokenCookie } from "../../lib/cookies"

export default async (req, res) => {
    const cookies = getTokenCookie(req);
    if(cookies['token']) removeTokenCookie(res, 'token');
    if(cookies['passportSession']) removeTokenCookie(res, 'passportSession');
    res.status(200).json({msg: {msgBody: "you have successfully logged out", msgError: false}, user: null})
}