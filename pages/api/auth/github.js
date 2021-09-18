import passport from "passport"
import { githubStrategy } from "../../../lib/strategies"
import nextConnect from "next-connect";
import withPassport from "../../../lib/withPassport";

passport.use(githubStrategy);

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        passport.authenticate('github')(req, res, (...args) => {
            console.log("passport authenticated", args)
        })
    } catch (error) {
        res.status(500).json({ msgError: true, msgBody: "Something went wrong..." })
    }
})

export default withPassport(handler);