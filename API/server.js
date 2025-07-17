const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const appRoutes = require("./routes");
const setupSocket = require("./sockets/index");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Global error handler
app.use(errorHandler);

//Connect mongoDB local or Atlas
connectDB();

// Routes
appRoutes(app);

// Create HTTP server and Socket.IO server
const server = setupSocket(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
