const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
	getAllVenues,
	getVenueProducts,
	getAllReviews,
} = require("../controllers/publicController");

// GET all venues (public)
router.get("/venues", async (req, res, next) => {
	try {
		const venues = await getAllVenues();
		res.status(200).json(venues);
	} catch (err) {
		next(err);
	}
});

// GET all products for a specific venue (public)
router.get("/venues/:venueId/products", async (req, res, next) => {
	try {
		const { venueId } = req.params;
		if (!mongoose.Types.ObjectId.isValid(venueId)) {
			return res.status(400).json({ message: "Invalid venue ID format" });
		}
		const products = await getVenueProducts(venueId);
		res.status(200).json(products);
		console.log(products);
	} catch (err) {
		next(err);
	}
});

// GET all venues (public)
router.get("/reviews", async (req, res, next) => {
	try {
		const reviews = await getAllReviews();
		res.status(200).json(reviews);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
