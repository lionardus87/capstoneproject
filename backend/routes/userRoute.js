const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET user by email
router.get("/", async (req, res) => {
	try {
		const emailId = req.query.emailId;
		if (!emailId) return res.status(400).send("Missing emailId");

		const user = await User.find({ email: emailId });
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// POST check password
router.post("/checkPassword", async (req, res) => {
	try {
		const { email, username, password } = req.body;

		if (!email && !username) {
			return res.status(400).send("Missing email or username");
		}

		const query = email ? { email } : { username };
		const user = await User.findOne(query);

		if (!user) {
			return res.status(401).send("User not found");
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).send("Invalid password");
		}

		res.status(200).json(user);
	} catch (err) {
		console.error("checkPassword error:", err);
		res.status(500).send("Error checking password");
	}
});

module.exports = router;
