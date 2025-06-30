const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const { checkVenueOwner } = require("../middlewares/checkVenueOwner");
const {
	placeOrder,
	getVenueOrders,
	getMemberOrders,
	updateOrderStatus,
} = require("../controllers/orderController");

// Member place orders
router.post(
	"/member/:userId/orders",
	authMiddleWare,
	checkRole(["member"]),
	async (req, res) => {
		try {
			const userId = req.params.userId;
			if (req.user._id !== userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}
			const groupedItems = req.body;
			if (!groupedItems || typeof groupedItems !== "object") {
				return res.status(400).json({ message: "Invalid order payload" });
			}
			console.log("Routerpayload", groupedItems);
			console.log("Router user", userId);
			const order = await placeOrder(groupedItems, userId);
			res.status(201).json(order);
		} catch (err) {
			console.error("Order creation error:", err);
			res.status(500).json({ message: "Failed to place order" });
		}
	}
);

// Venue receive orders
router.get(
	"/admin/venues/:venueId/orders",
	authMiddleWare,
	checkRole(["admin"]),
	checkVenueOwner,
	async (req, res) => {
		try {
			const { venueId } = req.params;
			const orders = await getVenueOrders(venueId);
			if (!orders || orders.length === 0) {
				return res.status(404).json({ message: "No orders found for this venue" });
			}
			res.status(200).json(orders);
		} catch (err) {
			console.error("Error fetching venue orders:", err);
			res
				.status(500)
				.json({ message: err.message || "Server error fetching orders" });
		}
	}
);

// User check order status
router.get(
	"/member/:userId/orders",
	authMiddleWare,
	checkRole(["member"]),
	async (req, res) => {
		try {
			const { userId } = req.params;

			// Only allow the user to fetch their own orders
			if (req.user._id !== userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}

			const orders = await getMemberOrders(userId);
			res.status(200).json(orders);
		} catch (err) {
			console.error("Error fetching member orders:", err);
			res.status(500).json({ message: "Failed to retrieve orders" });
		}
	}
);

//admin and member order status
router.patch(
	"/orders/:orderId/status",
	authMiddleWare,
	checkRole(["admin", "member"]),
	async (req, res) => {
		try {
			const { orderId } = req.params;
			const { status } = req.body;
			const user = req.user;

			if (!status) {
				return res.status(400).json({ message: "Status is required" });
			}

			const updatedOrder = await updateOrderStatus(orderId, status, user);
			if (!updatedOrder) {
				return res.status(404).json({ message: "Order not found or unauthorized" });
			}

			res.status(200).json({ message: "Order updated", order: updatedOrder });
		} catch (err) {
			console.error("Error updating order status:", err);
			res.status(500).json({ message: err.message || "Failed to update status" });
		}
	}
);

module.exports = router;
