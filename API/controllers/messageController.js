const messageService = require("../services/messageService");

const fetchMessages = async () => {
	return await messageService.getAllMessages();
};

const createMessage = async (data) => {
	const saved = await messageService.saveMessage(data);
	return saved;
};

module.exports = {
	fetchMessages,
	createMessage,
};
