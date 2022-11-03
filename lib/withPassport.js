import redirect from 'micro-redirect';
import passport from 'passport';
import { githubStrategy } from './strategies/github';
import { fetchUserById } from './user';

passport.use(githubStrategy);

passport.serializeUser((user, done) => {
  const { id } = user;
  done(null, { id });
});

passport.deserializeUser(async (id, done) => {
  const user = await fetchUserById(id);
  done(null, user);
});

// export middleware to wrap api/auth handlers
const handler = (fn) => (req, res) => {
  if (!res.redirect) {
    // passport.js needs res.redirect:
    // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect
    res.redirect = (location) => redirect(res, 302, location);
  }

  // Initialize Passport and restore authentication state, if any, from the
  // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
  // does in express.
  passport.initialize()(req, res, () =>
    passport.session()(req, res, () =>
      // call wrapped api route as innermost handler
      fn(req, res)
    )
  );
};

export default handler;
