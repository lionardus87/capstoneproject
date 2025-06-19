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

// Register user
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

// User login
router.post("/login", async (req, res) => {
	// console.log("Login payload:", req.body);
	try {
		const result = await login(req.body);
		if (result.error) {
			console.log("Login error:", result.error);
			return res.status(401).json({ message: result.error });
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
	res.status(200).json(req.loginUser);
});

// GET user by email
// router.get("/", async (req, res) => {
// 	try {
// 		const emailId = req.query.emailId;
// 		if (!emailId) return res.status(400).send("Missing emailId");

// 		const user = await User.find({ email: emailId });
// 		res.status(200).json(user);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send("Server error");
// 	}
// });

// POST check password
// router.post("/checkPassword", async (req, res) => {
// 	try {
// 		const { email, username, password } = req.body;

// 		if (!email && !username) {
// 			return res.status(400).send("Missing email or username");
// 		}

// 		const query = email ? { email } : { username };
// 		const user = await User.findOne(query);

// 		if (!user) {
// 			return res.status(401).send("User not found");
// 		}

// 		const isValid = await bcrypt.compare(password, user.password);
// 		if (!isValid) {
// 			return res.status(401).send("Invalid password");
// 		}

// 		res.status(200).json(user);
// 	} catch (err) {
// 		console.error("checkPassword error:", err);
// 		res.status(500).send("Error checking password");
// 	}
// });

module.exports = router;
