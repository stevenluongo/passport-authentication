import { createUser } from "../../lib/user";
import { removeTokenCookie } from "../../lib/auth-cookies";

export default async (req, res) => {
    switch (req.method) {
        case "GET" :
            await logout(req, res)
            break;
        case "POST": 
            await register(req, res)
            break;
    }
}

const logout = async(req, res) => {
    removeTokenCookie(res)
    res.status(200).json({msgBody: "you have successfully logged out", msgError: false})
}

const register = async(req, res) => {
    const {username, password} = req.body;
    const data = await createUser(username, password)
    res.json({msg: {data}})
}