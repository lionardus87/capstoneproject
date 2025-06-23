import axios from "axios";
import axiosInstance from "./axiosInstance";

export const addProduct = async ({
	itemName,
	description,
	price,
	category,
	imageUrl,
	venueId,
}) => {
	try {
		const accessToken = sessionStorage.getItem("accessToken");
		const response = await axios.post(
			`http://localhost:3003/admin/venues/${venueId}/products`,
			{
				itemName,
				description,
				price,
				category,
				imageUrl,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.response?.data || error.message };
	}
};

// Public products
export const fetchAllPublicProducts = (venueId) => {
	if (!venueId) throw new Error("venueId is required to fetch products");
	return axiosInstance.get(`/venues/${venueId}/products`);
};

// Admin-only products
export const fetchAdminVenueProducts = async (venueId) => {
	if (!venueId) throw new Error("venueId is missing");
	return await axiosInstance.get(`/admin/venues/${venueId}/products`);
};
