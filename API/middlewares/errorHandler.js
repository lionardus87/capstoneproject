const errorHandler = (err, req, res, next) => {
	console.error("Unhandled Error:", err.stack || err);
	res.status(500).send("Something broke!");
};

module.exports = errorHandler;
