const usersMap = new Map();
const Message = require("../models/Message");

module.exports = function (io) {
	io.on("connection", (socket) => {
		console.log("User connected:", socket.id);

		socket.on("register_user", (username) => {
			if (!username) return;
			usersMap.set(username, socket.id);
			console.log("Registered user:", username, "->", socket.id);
			console.log("Users Map:", Array.from(usersMap.entries()));
			logUsersMap();
		});

		// Handle incoming message
		socket.on("send_message", async ({ from, to = "admin", message }) => {
			if (!from || !message) return;

			console.log(`Message from ${from} to ${to}: ${message}`);

			// Save to MongoDB
			const savedMessage = await new Message({ from, to, message }).save();

			// ✅ Save to DB
			//const newMessage = new Message({ from, to, message });
			//await newMessage.save();

			// Emit to recipient if online
			const recipientSocketId = usersMap.get(to);
			if (recipientSocketId) {
				io.to(recipientSocketId).emit("receive_message", {
					from,
					to,
					message,
					time: savedMessage.time,
				});
			}

			// Emit back to sender (to update sender's UI)
			socket.emit("receive_message", {
				from,
				to,
				message,
				time: savedMessage.time,
			});
		});

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

// Helper to log the current users map
function logUsersMap() {
	console.log("Users Map:", Array.from(usersMap.entries()));
}
