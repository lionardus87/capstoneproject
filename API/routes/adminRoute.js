const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const checkVenueOwner = require("../middlewares/checkVenueOwner");
const {
	getMyProducts,
	addProductItem,
	getAdminVenues,
	updateProduct,
	deleteProduct,
} = require("../controllers/adminController");

//Show Venue
router.get(
	"/venues",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		try {
			const adminId = req.user?._id;

			const venues = await getAdminVenues(adminId);
			res.status(200).json(venues);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

// Get products
router.get(
	"/venues/:venueId/products",
	authMiddleWare,
	checkRole(["admin"]),
	async (req, res) => {
		try {
			const adminId = req.user?._id;
			const venueId = req.params.venueId;

			const products = await getMyProducts(adminId, venueId);
			res.status(200).json(products);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

//Add product
router.post(
	"/venues/:venueId/products",
	authMiddleWare,
	checkRole(["admin"]),
	checkVenueOwner,
	async (req, res) => {
		try {
			const adminId = req.user?._id;
			const newProductItem = await addProductItem(req.body, adminId);

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

// Update product
router.put(
	"/venues/:venueId/products/:productId",
	authMiddleWare,
	checkRole(["admin"]),
	checkVenueOwner,
	async (req, res) => {
		try {
			const { productId, venueId } = req.params;
			const updatedData = req.body;
			console.log("Router payload:", productId, venueId);
			// console.log("Router body:", updatedData);
			const updatedProduct = await updateProduct(productId, venueId, updatedData);
			res.status(200).json(updatedProduct);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

// Delete product
router.delete(
	"/venues/:venueId/products/:productId",
	authMiddleWare,
	checkRole(["admin"]),
	checkVenueOwner,
	async (req, res) => {
		try {
			const { productId, venueId } = req.params;

			const deleted = await deleteProduct(productId, venueId);
			res.status(200).json(deleted);
		} catch (err) {
			const status = err.statusCode || 500;
			res.status(status).json({ message: err.message || "Server error" });
		}
	}
);

module.exports = router;
