import axiosInstance from "./axiosInstance";

//Shopping cart checkout
export const cartCheckout = async (userId, { venueId, items }) => {
	try {
		const response = await axiosInstance.post(`/member/${userId}/orders`, {
			venueId,
			items,
		});
		return { success: true, orderProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};

// Admin manage order
export const manageOrders = async (venueId) => {
	try {
		const response = await axiosInstance.get(`/admin/venues/${venueId}/orders`);
		return { success: true, orderProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};

// User check order status
export const viewOrderStatus = async (userId) => {
	try {
		const response = await axiosInstance.get(`/member/${userId}/orders`);
		return { success: true, orderProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};

// Order status update
export const changeOrderStatus = async (orderId, newStatus) => {
	try {
		const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
			status: newStatus,
		});
		return { success: true, updatedOrder: response.data.order };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};
