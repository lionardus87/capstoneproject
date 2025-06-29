const Product = require("../models/Product");
const Order = require("../models/Order");

const findProductById = async (productId) => {
	return await Product.findById(productId);
};

const createOrder = async (orderData) => {
	const newOrder = await new Order(orderData).save();
	return newOrder;
};

const findOrderByVenue = async (venueId) => {
	const orders = await Order.find({ venue: venueId })
		.populate("venue", "venueName")
		.populate("member", "username email")
		.populate("products.product", "itemName price");
	return orders;
};

const findOrdersByMember = async (memberId) => {
	return await Order.find({ member: memberId })
		.sort({ createdAt: -1 })
		.populate("venue", "venueName")
		.populate("products.product", "itemName price");
};

const findOrderById = async (orderId) => {
	return await Order.findById(orderId);
};

// const updateOrderStatusInDB = async (orderId, order) => {
// 	return await Order.findByIdAndUpdate(orderId, order, { new: true })
// 		.populate("member", "username email")
// 		.populate("products.product", "itemName price");
// };

module.exports = {
	findProductById,
	createOrder,
	findOrderByVenue,
	findOrdersByMember,
	findOrderById,
};
