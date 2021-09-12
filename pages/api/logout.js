import { removeTokenCookie } from "../../lib/auth-cookies"

export default async (req, res) => {
    removeTokenCookie(res)
    res.status(200).json({msgBody: "you have successfully logged out", msgError: false})
}