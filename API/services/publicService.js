const Venue = require("../models/Venue");
const Product = require("../models/Product");
const Testimonial = require("../models/Testimonial");

const findAllVenues = async () => {
	return await Venue.find();
};

const findProductsByVenueId = async (venueId) => {
	return await Product.find({ venue: venueId });
};

const findAllReviews = async () => {
	return await Testimonial.find()
		.populate("user", "username")
		.sort({ createdAt: -1 });
};

module.exports = {
	findAllVenues,
	findProductsByVenueId,
	findAllReviews,
};
