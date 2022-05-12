import { createUser, findUser } from "../../lib/user";
import { getLoginSession } from "../../lib/auth";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async(req, res) => {
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
});


handler.post(async(req, res) => {
    const data = await createUser(req.body);
    res.json(data)
})

export default handler;