const authRoutes = require("./authRoute");
const protectedRoutes = require("./protectedRoute");
const adminRoutes = require("./adminRoute");
const publicRoutes = require("./publicRoute");
const orderRoutes = require("./orderRoute");
const contactRoute = require("./contactRoute");
const messageRoutes = require("./messageRoute");
const testimonialRoute = require("./testimonialRoute");

const appRoutes = (app) => {
	app.use("/auth", authRoutes); //authentication
	app.use("/protected", protectedRoutes); //Extra layer protection - Role test routes
	app.use("/", publicRoutes); //Public venues/products
	app.use("/admin", adminRoutes); //Admin
	app.use("/", orderRoutes); // Order
	app.use("/", contactRoute); // Feedback message
	app.use("/", messageRoutes); // Support chat
	app.use("/", testimonialRoute); // Member's testimonials

	app.get("/", (req, res) =>
		res.json({
			status: "running",
			service: "Auth API",
			timestamp: new Date().toISOString(),
		})
	);
};

module.exports = appRoutes;
