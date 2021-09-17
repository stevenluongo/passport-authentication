import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "../../lib/strategies";
import { setLoginSession } from "../../lib/auth";

const authenticate = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false}, (error, token) => {
        if(error) reject(error);
        else resolve(token)
    })(req, res)
});

passport.use(localStrategy);

const handler = 
    nextConnect()
    .use(passport.initialize())
    .post(async (req, res) => {
    try {
        const user = await authenticate(req, res);
        console.log(user)
        const session = {...user}
        await setLoginSession(res, session);
        const {username, _id} = user;
        res.status(201).json({msg: { msgError: false, msgBody: `Welcome back, ${username}!` }, user: {username, _id}})
    } catch (err) {
        console.log(err)
        res.status(401).json({ msgError: true, msgBody: "Something went wrong..." })
    }
});

export default handler;