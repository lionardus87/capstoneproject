const { findVenueByAdminId, addMenu } = require("../services/venueService");

const addMenuItem = async (itemData, adminId) => {
	try {
		const { itemName, description, price, category, imageUrl } = itemData;

		console.log("Register payload:", itemData);
		console.log("Admin ID:", adminId);

		const venue = await findVenueByAdminId(adminId);
		if (!venue) {
			console.log("Cannot find venue for this admin");
			throw { statusCode: 403, message: "You are not the admin of any venue" };
		}

		const newMenuItem = await addMenu({
			itemName,
			description,
			price,
			category,
			imageUrl,
			venue: venue._id, // assuming Menu has a reference to Venue
		});

		return newMenuItem;
	} catch (err) {
		console.error("Add menu item error:", err);
		throw err;
	}
};

module.exports = { addMenuItem };
