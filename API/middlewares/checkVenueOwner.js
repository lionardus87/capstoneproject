const Venue = require("../models/Venue");

module.exports = async function (req, res, next) {
	const userId = req.user?._id;

	const venue = await Venue.findOne({ admin: userId });
	if (!venue) return res.status(403).json({ message: "You do not own a venue" });

	req.venue = venue;
	next();
};
