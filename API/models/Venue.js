const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
	{
		venueName: { type: String, required: true, unique: true },
		city: { type: String, required: true },
		postcode: { type: String, required: true },
		logoUrl: { type: String },
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);
