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
		items.map(async ({ productId, qty, addons }) => {
			const product = await findProductById(productId);
			if (!product) throw new Error(`Product ${productId} not found`);
			return {
				product: product._id,
				qty,
				addons: addons || [],
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

	const orderVenueId = String(order.venue?._id || order.venue);
	const userVenueId = String(user.venueId);
	const orderMemberId = String(order.member?._id || order.member);
	const userId = String(user._id);

	// Admin access check
	if (user.role === "admin" && orderVenueId !== userVenueId) {
		console.log("Admin unauthorized:", { orderVenueId, userVenueId });
		return null;
	}

	// Member access check
	if (
		user.role === "member" &&
		orderMemberId !== userId &&
		!["Cancelled", "Completed"].includes(status)
	) {
		console.log("Member unauthorized:", { orderMemberId, userId, status });
		return null;
	}

	// Status handling
	if (status === "Completed") {
		if (user.role === "admin") order.confirmedByAdmin = true;
		if (user.role === "member") order.confirmedByMember = true;

		if (order.confirmedByAdmin && order.confirmedByMember) {
			order.status = "Completed";
		}
	} else {
		order.status = status;
		order.confirmedByAdmin = false;
		order.confirmedByMember = false;
	}

	await order.save();

	await order.populate([
		{ path: "member", select: "username email" },
		{ path: "venue", select: "venueName" },
		{ path: "products.product", select: "itemName price" },
	]);

	return order;
};

module.exports = {
	placeOrder,
	getVenueOrders,
	getMemberOrders,
	updateOrderStatus,
};
