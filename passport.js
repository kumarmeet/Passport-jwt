const passport = require("passport");
const localStratergy = require("passport-local").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtStratergy = require("passport-jwt").Strategy;

const userData = [];

passport.use(
	"signup",
	new localStratergy(
		{
			usernameField: "uname",
			passwordField: "password",
		},
		(uname, password, done) => {
			try {
				const user = userData.push({ _id: Math.random(), uname, password });
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	"login",
	new localStratergy(
		{
			usernameField: "uname",
			passwordField: "password",
		},
		(uname, password, done) => {
			try {
				const user = userData.find((user) => user.uname === uname);
				if (!user) {
					return done(null, false, { message: "User not found" });
				}

				const validate = userData.find((user) => user.password === password);

				if (!validate) {
					return done(null, false, { message: "Wrong Password" });
				}

				return done(null, user, { message: "Logged in Successfully" });
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	new jwtStratergy(
		{
			secretOrKey: "TOP_SECRET",
			// jwtFromRequest: extractJwt.fromUrlQueryParameter("secret_token"),
			jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
		},
		(token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);
