const {
	findVenueByAdminId,
	findProductsByVenueId,
	addProduct,
	deleteProductById,
	findProductsById,
	updateProductById,
} = require("../services/adminService");

// Get venue
const getAdminVenues = async (adminId) => {
	try {
		if (!adminId) throw { err, message: "Unauthorized" };
		const venues = await findVenuesByAdminId(adminId);
		return venues;
	} catch (err) {
		throw err;
	}
};
// Get product
const getMyProducts = async (adminId, venueId) => {
	try {
		const venue = await findVenueByAdminId(adminId);
		if (!venue) {
			throw { err, message: "You are not the admin of any venue" };
		}
		if (venue._id.toString() !== venueId) {
			throw { err, message: "Unauthorized venue access" };
		}

		const products = await findProductsByVenueId(venueId);
		return products;
	} catch (err) {
		console.error("Get my products error:", err);
		throw err;
	}
};

// Add product
const addProductItem = async (itemData, adminId) => {
	try {
		const { itemName, description, price, category, imageUrl } = itemData;

		if (!itemName || !price || !category) {
			throw { error, message: "Missing required product fields" };
		}

		const venue = await findVenueByAdminId(adminId);
		if (!venue) {
			throw { error, message: "You are not the admin of any venue" };
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

// Update product
const updateProduct = async (productId, venueId, updatedData) => {
	const product = await findProductsById(productId, venueId);
	if (!product) {
		throw { message: "Product not found" };
	}
	return await updateProductById(productId, updatedData);
};

// Delete product
const deleteProduct = async (productId, venueId) => {
	const product = await findProductsById(productId, venueId);
	if (!product) {
		throw { message: "Product not found" };
	}
	return await deleteProductById(productId);
};

module.exports = {
	getMyProducts,
	getAdminVenues,
	addProductItem,
	updateProduct,
	deleteProduct,
};
