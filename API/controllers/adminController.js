const {
	findVenueByAdminId,
	findProductsByVenueId,
	addProduct,
} = require("../services/adminService");

const getAdminVenues = async (adminId) => {
	try {
		if (!adminId) throw { statusCode: 401, message: "Unauthorized" };
		const venues = await findVenuesByAdminId(adminId);
		return venues;
	} catch (err) {
		throw err;
	}
};

const getMyProducts = async (adminId, venueId) => {
	try {
		const venue = await findVenueByAdminId(adminId);
		if (!venue) {
			throw { statusCode: 403, message: "You are not the admin of any venue" };
		}
		if (venue._id.toString() !== venueId) {
			throw { statusCode: 403, message: "Unauthorized venue access" };
		}

		const products = await findProductsByVenueId(venueId);
		return products;
	} catch (err) {
		console.error("Get my products error:", err);
		throw err;
	}
};

const addProductItem = async (itemData, adminId) => {
	try {
		const { itemName, description, price, category, imageUrl } = itemData;

		console.log("Register payload:", itemData);
		console.log("Admin ID:", adminId);

		const venue = await findVenueByAdminId(adminId);
		if (!venue) {
			console.log("Cannot find venue for this admin");
			throw { statusCode: 403, message: "You are not the admin of any venue" };
		}

		const newProductItem = await addProduct({
			itemName,
			description,
			price,
			category,
			imageUrl,
			venue: venue._id, // Product reference to Venue
		});

		return newProductItem;
	} catch (err) {
		console.error("Add product item error:", err);
		throw err;
	}
};

module.exports = { getMyProducts, addProductItem, getAdminVenues };
