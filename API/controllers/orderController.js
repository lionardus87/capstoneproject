const {
	findProductById,
	createOrder,
	findOrderByVenue,
	findOrdersByMember,

	findOrderById,
} = require("../services/orderService");

// Member place orders
const placeOrder = async (groupedItems, userId) => {
	const { venueId, items } = groupedItems;

	if (!venueId || !Array.isArray(items)) {
		throw new Error("Invalid order payload: missing venueId or items");
	}

	const populatedItems = await Promise.all(
		items.map(async ({ productId, qty }) => {
			const product = await findProductById(productId);
			if (!product) throw new Error(`Product ${productId} not found`);
			return {
				product: product._id,
				qty,
			};
		})
	);

	const newOrder = await createOrder({
		member: userId,
		venue: venueId,
		products: populatedItems,
		status: "Pending",
		note: "",
	});

	return newOrder;
};

// Admin get orders
const getVenueOrders = async (venueId) => {
	const orders = await findOrderByVenue(venueId);
	if (!orders) throw new Error("Orders not found");
	return orders;
};

//Member order status
const getMemberOrders = async (userId) => {
	const orders = await findOrdersByMember(userId);
	if (!orders || orders.length === 0) {
		throw new Error("No orders found");
	}
	return orders;
};

//Admin and Members order status
const updateOrderStatus = async (orderId, status, user) => {
	const order = await findOrderById(orderId);
	if (!order) return null;

	// Authorization checks:
	if (user.role === "admin" && order.venue.toString() !== user.venueId) {
		return null;
	}

	if (
		user.role === "member" &&
		order.member.toString() !== user._id &&
		!["Cancelled", "Completed"].includes(status)
	) {
		return null;
	}

	// Update confirmation flags if completing
	if (status === "Completed") {
		if (user.role === "admin") {
			order.confirmedByAdmin = true;
		} else if (user.role === "member") {
			order.confirmedByMember = true;
		}

		if (order.confirmedByAdmin && order.confirmedByMember) {
			order.status = "Completed";
		}
	} else {
		// Other statuses override confirmation flags reset
		order.status = status;
		// Optionally reset confirmation flags if status changes from Completed back to something else
		order.confirmedByAdmin = false;
		order.confirmedByMember = false;
	}

	await order.save();

	await order
		.populate("member", "username email")
		.populate("venue", "venueName")
		.populate("products.product", "itemName price");

	return order;
};

module.exports = {
	placeOrder,
	getVenueOrders,
	getMemberOrders,
	updateOrderStatus,
};
