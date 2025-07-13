const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
	{
		from: String, // username or "Guest"
		to: String, // "skittlelane"
		message: String,
		read: { type: Boolean, default: false },
		time: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SupportMessage", supportMessageSchema);
