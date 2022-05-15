import nextConnect from "next-connect";
import { updateUser, removeUser, fetchUserById } from "../../../../lib/user";

const handler = nextConnect();

//fetch user
handler.get(async(req, res) => {
    const { id } = req.query;
    try {
        const result = await fetchUserById(id);
        res.status(200).json({success: true, ...result})
    } catch (err) {
        res.status(500).json({message: err.message, ...err});
    }
})

//update user
handler.put(async(req, res) => {
    const { id } = req.query;
    try {
        const result = await updateUser(id, req.body);
        res.status(200).json({success: true, ...result})
    } catch (err) {
        res.status(500).json({message: err.message, ...err});
    }
})

//delete user
handler.delete(async(req, res) => {
    const { id } = req.query;
    try {
        const result = await removeUser(id);
        res.status(200).json({success: true, result})
    } catch (err) {
        res.status(500).json({message: err.message, ...err});
    }
})

export default handler;