const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const {
	getMyProducts,
	addProductItem,
	getAdminVenues,
} = require("../controllers/adminController");

router.get(
	"/venues",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		try {
			const adminId = req.user?._id;
			if (!adminId) return res.status(401).json({ message: "Unauthorized" });

			const venues = await getAdminVenues(adminId);
			res.status(200).json(venues);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

router.get(
	"/venues/:venueId/products",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		try {
			const adminId = req.user?._id;
			const venueId = req.params.venueId;
			if (!adminId) return res.status(401).json({ message: "Unauthorized" });

			const products = await getMyProducts(adminId, venueId);
			res.status(200).json(products);
			console.log(products);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

router.post(
	"/venues/:venueId/products",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		// console.log("Product payload:", req.body);
		try {
			const userId = req.user?._id;
			// console.log("Venue router response:", userId);
			if (!userId) return res.status(401).send("Unauthorized");

			const newProductItem = await addProductItem(req.body, userId);

			res.status(201).json({
				message: "Product item added successfully",
				productItem: newProductItem,
			});
		} catch (err) {
			console.error("Add product error:", err);
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

module.exports = router;
