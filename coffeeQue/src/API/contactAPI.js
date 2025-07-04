import axiosInstance from "./axiosInstance";

// Feedback message
export const sendFeedbackMsg = async (message) => {
	const response = await axiosInstance.post("/contact", message);
	return response;
};
