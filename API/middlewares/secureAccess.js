const { authMiddleWare } = require("./authMiddleware");
const { checkRole } = require("./checkRole");
const { checkVenueOwner } = require("./checkVenueOwner");

const secure = {
	guest: [], // for public routes with no auth
	member: [authMiddleWare, checkRole(["member"])],
	admin: [authMiddleWare, checkRole(["admin"])],
	adminOwner: [authMiddleWare, checkRole(["admin"]), checkVenueOwner],
	adminOrMember: [authMiddleWare, checkRole(["admin", "member"])],
};

module.exports = { secure };
