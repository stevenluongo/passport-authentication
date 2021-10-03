import { forgotPassword } from "../../lib/user"

export default async (req, res) => {
    switch(req.method) {
        case "PUT" : 
            handlePut(req, res)
            break;
    }
}

const handlePut = async(req, res) => {
    const payload = await forgotPassword(req.body);
    res.json({msg: "you made it !", response: payload})
}