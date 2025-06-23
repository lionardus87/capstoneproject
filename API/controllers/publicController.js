const {
	findAllVenues,
	findProductsByVenueId,
} = require("../services/publicService");

const getAllVenues = async () => {
	try {
		const venues = await findAllVenues();
		return venues;
	} catch (err) {
		throw new Error("Failed to fetch venues");
	}
};

const getVenueProducts = async (venueId) => {
	console.log("Venue ID received:", venueId);
	try {
		const products = await findProductsByVenueId(venueId);
		if (!products.length) {
			console.log(`No products found for venue ID ${venueId}`);
		}
		return products;
	} catch (err) {
		throw new Error("Failed to fetch products");
	}
};

module.exports = { getAllVenues, getVenueProducts };
