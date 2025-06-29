const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoute");
const protectedRoutes = require("./routes/protectedRoute");
const adminRoutes = require("./routes/adminRoute");
const publicRoutes = require("./routes/publicRoute");
const orderRoutes = require("./routes/orderRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

// Global middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Routes
app.use("/auth", authRoutes); //authentication
app.use("/protected", protectedRoutes); //Role test routes
app.use("/", publicRoutes); //Public venues/products
app.use("/admin", adminRoutes); //Admin
app.use("/", orderRoutes); // Order

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
