const express = require("express");
const router = express.Router();
const {
	register,
	login,
	generateAccessToken,
} = require("../controllers/authController");
const {
	authMiddleWare,
	refreshTokenMiddleWare,
} = require("../middlewares/authMiddleware");

// GET current user
router.get("/me", authMiddleWare, (req, res) => {
	res.status(200).json(req.loginUser);
});

// GET access token from refresh token
router.get("/accessToken", refreshTokenMiddleWare, async (req, res) => {
	try {
		const newAccessToken = await generateAccessToken(
			req.headers.authorization.replace("Bearer ", "")
		);
		res.status(200).json({ accessToken: newAccessToken });
	} catch (err) {
		console.error(err);
		res.status(500).send("Failed to generate access token");
	}
});

// POST create user
router.post("/register", async (req, res) => {
	try {
		const user = await register(req.body);
		if (!user) return res.status(409).send("User already exists");
		res.status(201).json(user);
	} catch (err) {
		console.error("Registration error:", err);
		res.status(500).send("Register failed");
	}
});

// POST login user
router.post("/login", async (req, res) => {
	try {
		const result = await login(req.body);
		if (!result) return res.status(401).send("Invalid credentials");
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Login failed");
	}
});

module.exports = router;
