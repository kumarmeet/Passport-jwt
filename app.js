const express = require("express");
const routes = require("./routes");
require("./passport");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
	return res.status(200).json({ message: "Hello World!!" });
});

app.use(routes);

app.listen(PORT, () => {
	console.log("Server running on port: " + PORT);
});
