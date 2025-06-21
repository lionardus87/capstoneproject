const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const { addMenuItem } = require("../controllers/venueController");

router.post(
	"/venues/menu",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		console.log("Menu payload:", req.body);
		try {
			const userId = req.user?._id;
			console.log("Venue router response:", userId);
			if (!userId) return res.status(401).send("Unauthorized");

			const newMenuItem = await addMenuItem(req.body, userId);

			res.status(201).json({
				message: "Menu item added successfully",
				menuItem: newMenuItem,
			});
		} catch (err) {
			console.error("Add menu error:", err);
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

module.exports = router;
