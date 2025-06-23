import axiosInstance from "./axiosInstance";

export const fetchAllVenues = async () => {
	const response = await axiosInstance.get("/venues");
	return response.data;
};
