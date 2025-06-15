const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI);
		console.log("Mongoose connected");
	} catch (err) {
		console.error("Mongoose connection error:", err);
		process.exit(1);
	}
};

module.exports = connectDB;
