const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const { placeOrder } = require("../controllers/orderController");

// New orders
router.post(
	"/member/:userId/orders",
	authMiddleWare,
	checkRole(["member"]),
	async (req, res) => {
		console.log("Order route", req.body);
		try {
			const userId = req.params.userId;
			if (req.user._id !== userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}
			const groupedItems = req.body;
			if (!groupedItems || typeof groupedItems !== "object") {
				return res.status(400).json({ message: "Invalid order payload" });
			}
			console.log("Order payload", groupedItems);
			const order = await placeOrder(groupedItems);
			res.status(201).json(order);
		} catch (err) {
			console.error("Order creation error:", err);
			res.status(500).json({ message: "Failed to place order" });
		}
	}
);

module.exports = router;
