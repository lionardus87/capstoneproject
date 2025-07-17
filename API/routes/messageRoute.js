const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Fetch messages
router.get("/messages", async (req, res) => {
	try {
		const messages = await messageController.fetchMessages();
		res.status(200).json(messages);
	} catch (err) {
		const status = err.statusCode || 500;
		res
			.status(status)
			.json({ message: err.message || "Failed to fetch messages" });
	}
});

// Save new message
router.post("/messages", async (req, res) => {
	try {
		const saved = await messageController.createMessage(req.body);
		res.status(201).json(saved);
	} catch (err) {
		const status = err.statusCode || 500;
		res.status(status).json({ message: err.message || "Failed to send message" });
	}
});

module.exports = router;
