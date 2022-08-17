const express = require("express");
const routes = require("./routes");
require("./passport");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

// Handle errors.
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({ error: err });
});

app.listen(PORT, () => {
	console.log("Server running on port: " + PORT);
});
