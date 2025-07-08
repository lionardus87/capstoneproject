const { createTestimonial } = require("../services/testimonialService");

const submitTestimonial = async (userId, rating, message) => {
	if (!rating || !message) {
		const error = new Error("Rating and message are required");
		error.statusCode = 400;
		throw error;
	}
	try {
		const newTestimonial = await createTestimonial(userId, rating, message);
		return newTestimonial;
	} catch (error) {
		throw error;
	}
};

module.exports = { submitTestimonial };
