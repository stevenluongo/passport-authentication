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
        const session = {...user}
        const cookie = await setLoginSession(res, session);
        const {username} = user;
        res.setHeader("Set-cookie", cookie)
        res.status(201).json({success: true, message: `Welcome back, ${username}`, user})
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

export default handler;