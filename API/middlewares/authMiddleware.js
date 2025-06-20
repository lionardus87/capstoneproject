const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const authMiddleWare = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).send("No token provided");
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, privateKey);
		req.user = decoded;
		next();
	} catch (err) {
		console.error("authMiddleware error:", err);
		return res.status(401).send("Invalid or expired token");
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
