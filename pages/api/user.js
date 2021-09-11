import { createUser } from "../../lib/user";

export default async (req, res) => {
    switch (req.method) {
        case "POST": 
            await register(req, res)
    }
}

const register = async(req, res) => {
    const {username, password} = req.body;
    const data = await createUser(username, password)
    res.json({msg: {data}})
}