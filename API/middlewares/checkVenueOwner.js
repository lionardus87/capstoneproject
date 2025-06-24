const Venue = require("../models/Venue");

const checkVenueOwner = async (req, res, next) => {
	try {
		const adminId = req.user?._id;
		const venueId = req.params.venueId;

		if (!adminId || !venueId) {
			return res.status(400).json({ message: "Missing required parameters" });
		}

		const venue = await Venue.findOne({ _id: venueId, admin: adminId });
		if (!venue) {
			return res.status(403).json({ message: "You do not own this venue" });
		}

		req.venue = venue; // attach the venue if needed downstream
		next();
	} catch (err) {
		console.error("checkVenueOwner error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = checkVenueOwner;
