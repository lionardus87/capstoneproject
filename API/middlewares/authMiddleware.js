const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const authMiddleWare = (req, res, next) => {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) return res.status(401).send("Missing access token");

	try {
		const decoded = jwt.verify(token, privateKey);
		req.loginUser = decoded;
		next();
	} catch (err) {
		console.error(err);
		res.status(403).send("Invalid access token");
	}
};

const refreshTokenMiddleWare = (req, res, next) => {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) return res.status(401).send("Missing refresh token");

	try {
		const payload = jwt.verify(token, refreshTokenKey);
		req.refreshUser = payload;
		next();
	} catch (err) {
		console.error(err);
		res.status(403).send("Invalid refresh token");
	}
};

module.exports = { authMiddleWare, refreshTokenMiddleWare };
