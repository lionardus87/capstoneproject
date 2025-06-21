const checkRole = (roles) => (req, res, next) => {
	if (!req.user || !roles.includes(req.user.role)) {
		return res.status(403).send("Forbidden: insufficient permissions");
	}
	next();
};

module.exports = { checkRole };
