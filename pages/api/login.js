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
        await setLoginSession(res, session);
        res.status(201).json({msg: "You have been successfully logged in."})
    } catch (err) {
        console.log(err)
        res.status(401).json({msg: "something went wrong..."})
    }
});

export default handler;