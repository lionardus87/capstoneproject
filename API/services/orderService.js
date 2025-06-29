const Product = require("../models/Product");
const Order = require("../models/Order");

const findProductById = async (productId) => {
	return await Product.findById(productId);
};

const createOrder = async (orderData) => {
	const newOrder = await new Order(orderData).save();
	return newOrder;
};

module.exports = {
	findProductById,
	createOrder,
};
