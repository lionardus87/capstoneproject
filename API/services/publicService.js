const Venue = require("../models/Venue");
const Product = require("../models/Product");

const findAllVenues = async () => {
	return await Venue.find();
};

const findProductsByVenueId = async (venueId) => {
	return await Product.find({ venue: venueId });
};
module.exports = {
	findAllVenues,
	findProductsByVenueId,
};
