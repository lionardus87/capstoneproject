const express = require("express");
const router = express.Router();
const {
	register,
	registerVenue,
	login,
	generateAccessToken,
} = require("../controllers/authController");
const {
	authMiddleWare,
	refreshTokenMiddleWare,
} = require("../middlewares/authMiddleware");

// Register user
router.post("/register", async (req, res) => {
	try {
		const user = await register(req.body);
		res.status(201).json(user);
	} catch (err) {
		console.error("Registration error:", err);
		return res.status(409).json({
			error: err.message || "Registration failed",
			field: err.field || "root",
		});
	}
});

//Register Venue
router.post("/registervenue", authMiddleWare, async (req, res) => {
	console.log("Login payload:", req.body);
	try {
		const userId = req.user?._id;
		console.log("Venue router response:", userId);
		if (!userId) return res.status(401).send("Unauthorized");

		const venue = await registerVenue(req.body, userId);
		if (venue?.error) return res.status(409).send(venue.error);
		console.log("Venue router response:", venue);

		if (venue?.error) return res.status(409).send(venue.error);
		res.status(201).json(venue);
	} catch (err) {
		console.error("Registration error:", err);
		res.status(500).send("Register failed");
	}
});

// User login
router.post("/login", async (req, res) => {
	// console.log("Login payload:", req.body);
	try {
		const result = await login(req.body);
		if (result.error) {
			console.log("Login error:", result.error);
			return res
				.status(401)
				.json({ message: result.error, field: result.field || null });
		}
		res.status(200).json(result);
	} catch (err) {
		console.error("Login failed server error:", err);
		res.status(500).send("Login failed");
	}
});

// Refresh access token
router.get("/accessToken", refreshTokenMiddleWare, async (req, res) => {
	try {
		const token = req.headers.authorization.replace("Bearer ", "");
		const accessToken = await generateAccessToken(token);
		res.status(200).json({ accessToken });
	} catch (err) {
		console.error("Token refresh error:", err);
		res.status(403).json({ message: "Invalid refresh token" });
	}
});

//GET
router.get("/me", authMiddleWare, async (req, res) => {
	res.status(200).json(req.user);
});

module.exports = router;
