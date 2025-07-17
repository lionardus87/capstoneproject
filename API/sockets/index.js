const http = require("http");
const { Server } = require("socket.io");

const setupSocket = (app) => {
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: {
			origin: "*", // or your frontend URL
			methods: ["GET", "POST"],
		},
	});

	require("./chatScoket")(io);
	return server;
};

module.exports = setupSocket;
