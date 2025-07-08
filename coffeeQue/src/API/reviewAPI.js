import axiosInstance from "./axiosInstance";

// New testimonial
export const submitReview = async (reviewData) => {
	const response = await axiosInstance.post("/reviews", reviewData);
	return response.data;
};

// Fetch testimonial
export const getTestimonials = async () => {
	const response = await axiosInstance.get("/reviews");
	return response.data;
};
