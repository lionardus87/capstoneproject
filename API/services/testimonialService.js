const Testimonial = require("../models/Testimonial");

const createTestimonial = async (userId, rating, message) => {
	const testimonial = new Testimonial({
		user: userId,
		rating,
		message,
	});
	return await testimonial.save();
};

module.exports = { createTestimonial };
