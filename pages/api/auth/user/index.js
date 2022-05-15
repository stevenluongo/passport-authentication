import { createLocalUser } from "../../../../lib/user";

//create new user
export default async (req, res) => {
    try {
        const response = await createLocalUser(req.body);
        res.status(201).json({success: true, ...response});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}