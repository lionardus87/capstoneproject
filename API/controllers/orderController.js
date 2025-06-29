const { findProductById, createOrder } = require("../services/orderService");

const placeOrder = async (groupedItems) => {
	const allOrders = [];

	for (const [venueId, items] of Object.entries(groupedItems)) {
		if (!Array.isArray(items) || items.length === 0) {
			continue;
		}

		const order = await placeOrder(userId, venueId, items);
		allOrders.push(order);
	}
	const populatedItems = await Promise.all(
		cartItems.map(async ({ productId, qty }) => {
			const product = await findProductById(productId);
			if (!product) throw new Error(`Product ${productId} not found`);
			return {
				product: product._id,
				itemName: product.itemName,
				price: product.price,
				qty,
			};
		})
	);

	const total = populatedItems.reduce(
		(sum, item) => sum + item.price * item.qty,
		0
	);

	const newOrder = await createOrder({
		user: userId,
		venue: venueId,
		items: populatedItems,
		status: "pending", // default status
		total,
		createdAt: new Date(),
	});

	return newOrder;
};

module.exports = {
	placeOrder,
};
