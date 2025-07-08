const mongoose = require("mongoose");

// Schema for addon options inside an order product
const orderAddonSchema = new mongoose.Schema(
	{
		label: { type: String, required: true }, // e.g. "Large", "Soy Milk"
		price: { type: Number, default: 0 },
	},
	{ _id: false }
);

const orderProductSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		qty: { type: Number, default: 1 },
		addons: {
			type: [orderAddonSchema],
			default: [],
		},
	},
	{ _id: false }
);

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
		products: {
			type: [orderProductSchema],
			required: true,
			validate: [(arr) => arr.length > 0, "Order must have at least one product"],
		},
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
		confirmedByAdmin: { type: Boolean, default: false },
		confirmedByMember: { type: Boolean, default: false },
		note: { type: String, default: "" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
