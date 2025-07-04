const usersMap = new Map();
const Message = require("../models/Message");

module.exports = function (io) {
	io.on("connection", (socket) => {
		console.log("User connected:", socket.id);

		socket.on("register_user", (username) => {
			console.log("REGISTER EVENT FROM CLIENT:", username);
			usersMap.set(username, socket.id);
			console.log("Registered user:", username, "->", socket.id);
			console.log("Users Map:", Array.from(usersMap.entries()));
		});

		socket.on("send_message", async ({ from, to = "admin", message }) => {
			console.log(`Message from ${from} to ${to}: ${message}`);
			console.log("Users Map:", [...usersMap.entries()]);
			const recipientSocketId = usersMap.get(to);

			const newMessage = new Message({ from, to, message });
			await newMessage.save(); // ✅ Save to DB

			// Emit to recipient if online
			if (recipientSocketId) {
				io.to(recipientSocketId).emit("receive_message", {
					from,
					to,
					message,
					time: newMessage.time,
				});
			}

			// Also emit back to sender so it updates UI
			socket.emit("receive_message", {
				from,
				to,
				message,
				time: newMessage.time,
			});
		});

		socket.on("disconnect", () => {
			for (const [username, id] of usersMap.entries()) {
				if (id === socket.id) {
					usersMap.delete(username);
					break;
				}
			}
			console.log("User disconnected:", socket.id);
		});
	});
};
