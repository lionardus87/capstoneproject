const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Fetch all messages (or only between specific users if needed)
router.get("/messages", async (req, res) => {
	try {
		const messages = await Message.find().sort({ time: 1 });
		res.json(messages);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch messages" });
	}
});

module.exports = router;
