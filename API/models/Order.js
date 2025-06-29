const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		member: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		venue: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Venue",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				qty: { type: Number, default: 1 },
				// Optional for future
				// addOns: [{ name: String, value: String }],
			},
		],
		status: {
			type: String,
			enum: [
				"Pending", // just placed, awaiting review
				"Accepted", // accepted by venue admin
				"Preparing", // being prepared
				"Ready", // ready for pickup
				"Completed", // picked up by customer
				"Rejected", // rejected by venue (out of stock, closed, etc.)
				"Cancelled", // user-initiated cancel
			],
			default: "Pending",
		},
		note: String,
	},
	{ timestamps: true }
);
