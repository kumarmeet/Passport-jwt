const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
	"/signup",
	passport.authenticate("signup", { session: false }),
	(req, res) => {
		res.json({ user: req.user, message: "Signup successfully." });
	}
);

router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred.");
				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, uname: user.uname };
				const token = jwt.sign({ user: body }, "TOP_SECRET", {
					expiresIn: "1m",
				});

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		const token = req.get("Authorization").split(" ")[1];

		return res.status(200).json({
			user: req.user,
			// token: req.query.secret_token,
			token: token,
			message: "Hello World!!",
		});
	}
);

module.exports = router;
