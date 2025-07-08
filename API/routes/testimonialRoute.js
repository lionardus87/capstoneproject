const express = require("express");
const router = express.Router();
const { submitTestimonial } = require("../controllers/testimonialController");
const { authMiddleWare } = require("../middlewares/authMiddleware");

// New testimonial
router.post("/reviews", authMiddleWare, async (req, res) => {
	try {
		const { rating, message } = req.body;
		const userId = req.user._id;
		const result = await submitTestimonial(userId, rating, message);

		res.status(201).json({
			success: true,
			message: "Review submitted successfully",
			data: result,
		});
	} catch (err) {
		const status = err.statusCode || 500;
		res
			.status(status)
			.json({ message: err.message || "Failed to submit testimonial" });
	}
});

module.exports = router;
