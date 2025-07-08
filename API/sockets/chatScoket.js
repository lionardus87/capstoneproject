const usersMap = new Map();
const messageService = require("../services/messageService");

module.exports = function (io) {
	io.on("connection", (socket) => {
		// console.log("User connected:", socket.id);

		// Register user with socket ID
		socket.on("register_user", (username) => {
			if (!username) return;
			usersMap.set(username, socket.id);
			// console.log(`Registered: ${username} → ${socket.id}`);
			logUsersMap();
		});

		// Send message
		socket.on("send_message", async ({ from, to = "admin", message }) => {
			if (!from || !message) return;

			try {
				// Save message to DB using service
				const savedMessage = await messageService.saveMessage({
					from,
					to,
					message,
				});

				const payload = {
					from,
					to,
					message,
					time: savedMessage.time,
				};

				// Emit to recipient if online
				const recipientSocketId = usersMap.get(to);
				if (recipientSocketId) {
					io.to(recipientSocketId).emit("receive_message", payload);
				}

				// Echo back to sender to update UI
				socket.emit("receive_message", payload);
			} catch (err) {
				console.error("Failed to save or emit message:", err.message || err);
				socket.emit("error", { message: "Failed to send message" });
			}
		});

		// Handle disconnect
		socket.on("disconnect", () => {
			for (const [username, id] of usersMap.entries()) {
				if (id === socket.id) {
					usersMap.delete(username);
					console.log(`${username} disconnected`);
					break;
				}
			}
			logUsersMap();
		});
	});
};

// Helper to print current user-socket mapping
function logUsersMap() {
	console.log("Current Users Map:", Array.from(usersMap.entries()));
}
