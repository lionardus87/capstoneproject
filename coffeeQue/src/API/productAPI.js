// import axios from "axios";
import axiosInstance from "./axiosInstance";

export const addProduct = async (venueId, data) => {
	try {
		const response = await axiosInstance.post(
			`/admin/venues/${venueId}/addproducts`,
			data
		);
		return { success: true, newProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
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

// Update product
export const updateProductRequest = async (venueId, productId, data) => {
	try {
		const response = await axiosInstance.put(
			`/admin/venues/${venueId}/products/${productId}`,
			data
		);
		return { success: true, updatedProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};

// Delete product
export const deleteProductRequest = async (venueId, productId) => {
	try {
		const response = await axiosInstance.delete(
			`/admin/venues/${venueId}/products/${productId}`
		);
		return { success: true, deletedProduct: response.data };
	} catch (error) {
		return {
			success: false,
			message: error.response?.data?.message || error.message,
		};
	}
};
