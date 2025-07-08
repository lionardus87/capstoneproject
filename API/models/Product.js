const mongoose = require("mongoose");

const addonOptionSchema = new mongoose.Schema(
	{
		label: { type: String, required: true },
		price: { type: Number, default: 0 },
	},
	{ _id: false }
);

const addonGroupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true }, // e.g. "Size", "Milk", "Sugar"
		required: { type: Boolean, default: false },
		options: [addonOptionSchema],
	},
	{ _id: false }
);

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
		addons: {
			type: [addonGroupSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
