import { createUser, findUser } from "../../lib/user";
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
        const user = session ? await findUser({_id: session._doc._id}) : null;
        if(!user) {
            res.status(200).json(null)
            return;
        } 
        const {id, username} = user
        res.status(200).json({ id, username })
    } catch (error) {
        console.error(error)
        res.status(500).end('Authentication token is invalid, please log in')
    }
}

const register = async(req, res) => {
    const data = await createUser(req.body);
    res.json(data)
}