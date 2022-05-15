import { createLocalUser, fetchUserById } from "../../../lib/user";
import { getLoginSession } from "../../../lib/auth";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async(req, res) => {
    try {
        const session = await getLoginSession(req)
        const user = session ? await fetchUserById(session._id) : null;
        if(!user) {
            res.status(200).json({user: null})
            return;
        } 
        const { _id, username } = user
        res.status(200).json({ user: { username, _id }})
    } catch (error) {
        console.error(error)
        res.status(500).end('Authentication token is invalid, please log in')
    }
});

handler.post(async(req, res) => {
    try {
        const response = await createLocalUser(req.body);
        res.status(201).json({success: true, ...response});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
})

export default handler;