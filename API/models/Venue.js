const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
	{
		venueName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		postcode: {
			type: String,
			required: true,
			trim: true,
		},
		logoUrl: {
			type: String,
			trim: true,
			default: "",
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);
