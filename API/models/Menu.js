const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		imageUrl: { type: String },
		category: {
			type: String,
			enum: ["Coffee", "Food"],
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
