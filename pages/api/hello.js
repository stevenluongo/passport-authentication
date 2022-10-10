import { createLocalUser } from "../../lib/user";

export default async(req, res) => {
    const response = await createLocalUser();
    res.json({ message: 'hello'});
}