const Message = require("../models/Message");

const getAllMessages = async () => {
	return await Message.find().sort({ time: 1 });
};

const saveMessage = async ({ from, to, message }) => {
	if (!from || !message) {
		throw { statusCode: 400, message: "Missing sender or message" };
	}
	const newMessage = new Message({ from, to, message });
	return await newMessage.save();
};

module.exports = {
	getAllMessages,
	saveMessage,
};
