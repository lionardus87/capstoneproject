import axiosInstance from "./axiosInstance";

// Feedback message
export const sendFeedbackMsg = async (message) => {
	const response = await axiosInstance.post("/contact", message);
	return response;
};

// Support chat
export const fetchChatMessages = async () => {
	try {
		const res = await axiosInstance.get("/messages");
		return res.data;
	} catch (err) {
		console.error("Error in fetchChatMessages:", err);
		throw err;
	}
};
