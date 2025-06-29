import axiosInstance from "./axiosInstance";

export const cartCheckout = async (userId, { venueId, items }) => {
	try {
		const response = await axiosInstance.post(
			`/member/${userId}/orders`,
			{ venueId, items } // fix: use correct POST body
		);
		return { success: true, orderProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};
