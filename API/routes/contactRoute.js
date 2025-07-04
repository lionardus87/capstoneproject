const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controllers/contactController");

router.post("/contact", async (req, res) => {
	try {
		const result = await sendContactEmail(req.body);
		res.status(200).json(result);
	} catch (err) {
		console.error("Contact email error:", err.message);
		res
			.status(err.status || 500)
			.json({ message: err.message || "Internal server error" });
	}
});

module.exports = router;
