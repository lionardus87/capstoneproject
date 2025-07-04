import axiosInstance from "./axiosInstance";

// Venues public access
export const fetchAllVenues = async () => {
	const response = await axiosInstance.get("/venues");
	return response.data;
};
