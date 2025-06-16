const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoute");
const protectedRoutes = require("./routes/protectedRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

// Global middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/", (req, res) =>
	res.json({
		status: "running",
		service: "Auth API",
		timestamp: new Date().toISOString(),
	})
);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
