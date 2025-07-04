const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoute");
const protectedRoutes = require("./routes/protectedRoute");
const adminRoutes = require("./routes/adminRoute");
const publicRoutes = require("./routes/publicRoute");
const orderRoutes = require("./routes/orderRoute");
const contactRoute = require("./routes/contactRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*", // or your frontend URL
		methods: ["GET", "POST"],
	},
});

require("./sockets/chatScoket")(io);

connectDB();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Routes
app.use("/auth", authRoutes); //authentication
app.use("/protected", protectedRoutes); //Role test routes
app.use("/", publicRoutes); //Public venues/products
app.use("/admin", adminRoutes); //Admin
app.use("/", orderRoutes); // Order
app.use("/", contactRoute); // Feedback message

app.get("/", (req, res) =>
	res.json({
		status: "running",
		service: "Auth API",
		timestamp: new Date().toISOString(),
	})
);

// Global error handler
app.use(errorHandler);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
