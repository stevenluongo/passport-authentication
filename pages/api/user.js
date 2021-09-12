import { createUser, findUserById } from "../../lib/user";
import { getLoginSession } from "../../lib/auth";

export default async (req, res) => {
    switch (req.method) {
        case "GET" :
            await fetchSession(req, res)
            break;
        case "POST": 
            await register(req, res)
            break;
    }
}

const fetchSession = async(req, res) => {
    try {
        const session = await getLoginSession(req)
        if(!session) {
            res.status(401).end()
            return;
        }
        const _id = session._doc.id;
        const user = session ? await findUserById(_id) : null;
        const {id, username} = user
        res.status(200).json({ id, username })
    } catch (error) {
        console.error(error)
        res.status(500).end('Authentication token is invalid, please log in')
    }
}

const register = async(req, res) => {
    const {username, password} = req.body;
    const data = await createUser(username, password)
    res.json(data)
}