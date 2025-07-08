const mongoose = require("mongoose");

const connectDB = async () => {
	const source = "local" || process.env.MONGO_SOURCE;

	let uri;

	if (source === "atlas") {
		const user = encodeURIComponent(process.env.DB_USER);
		const pass = encodeURIComponent(process.env.DB_PASS);
		const host = process.env.DB_HOST;
		const dbName = process.env.DB_NAME;
		const appName = process.env.DB_APPNAME;

		uri = `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;
	} else {
		uri = process.env.DATABASE_URI;
	}

	try {
		await mongoose.connect(uri);
		console.log(`✅ Mongoose connected to ${source.toUpperCase()} database`);
	} catch (err) {
		console.error("❌ Mongoose connection error:", err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
