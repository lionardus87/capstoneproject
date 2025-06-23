const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		itemName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		imageUrl: {
			type: String,
			trim: true,
			default: "",
		},
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

module.exports = mongoose.model("Product", productSchema);
