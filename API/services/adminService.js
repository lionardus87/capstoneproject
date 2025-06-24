const axios = require("axios");
const Venue = require("../models/Venue");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const findVenueByAdminId = async (adminId) => {
	return await Venue.findOne({ admin: adminId }).exec();
};

const findVenuesByAdminId = async (adminId) => {
	return await Venue.find({ admin: adminId });
};

const findProductsByVenueId = async (venueId) => {
	return await Product.find({ venue: venueId });
};

const addProduct = async (productData) => {
	const item = await new Product(productData).save();
	return item;
};
const updateProductById = async (product, data) => {
	return await Product.findByIdAndUpdate(product, data, {
		new: true, // Return the updated document
		runValidators: true, // Ensure schema validation runs
	}).exec();
};

const findProductsById = async (productId, venueId) => {
	return await Product.findOne({ _id: productId, venue: venueId });
};

const deleteProductById = async (id) => {
	return await Product.findByIdAndDelete(id).exec();
};

module.exports = {
	findVenueByAdminId,
	findVenuesByAdminId,
	findProductsByVenueId,
	addProduct,
	updateProductById,
	findProductsById,
	deleteProductById,
};
