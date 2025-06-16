const checkRole = (roles) => (req, res, next) => {
	if (!req.loginUser || !roles.includes(req.loginUser.role)) {
		return res.status(403).send("Forbidden: insufficient permissions");
	}
	next();
};

module.exports = { checkRole };
