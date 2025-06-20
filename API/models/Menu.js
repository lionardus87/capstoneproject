const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
	{
		itemName: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		imageUrl: { type: String },
		category: {
			type: String,
			enum: ["Drinks", "Foods"],
			required: true,
		},
		venue: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Venue",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
