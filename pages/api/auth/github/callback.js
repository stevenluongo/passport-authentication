import passport from "passport";
import { githubStrategy } from "../../../../lib/strategies";
import nextConnect from "next-connect";
import withPassport from "../../../../lib/withPassport";
import { setLoginSession } from "../../../../lib/auth";

passport.use(githubStrategy);

const authenticate = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('github', {session: false}, (error, token) => {
        if(error) reject(error);
        else resolve(token);
    })(req, res)
})

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        const user = await authenticate(req, res);
        const session = {...user}
        const cookie = await setLoginSession(res, session)
        res.setHeader("Set-Cookie", cookie)
        res.redirect("/")
    } catch (err) {
        res.status(500).json({success: false, message: err.message })
    }
})

export default withPassport(handler);