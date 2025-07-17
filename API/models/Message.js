const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	from: String,
	fromUsername: String,
	to: String,
	message: String,
	read: { type: Boolean, default: false },
	time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
