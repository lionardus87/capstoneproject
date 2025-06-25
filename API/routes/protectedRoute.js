const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");

//Public route
router.get("/public", (req, res) => res.send("Public content"));

//Member route
router.get("/member", authMiddleWare, checkRole(["member"]), (req, res) =>
	res.send("Member content")
);

// Admin route
router.get("/admin", authMiddleWare, checkRole(["admin"]), (req, res) =>
	res.send("Admin content")
);

module.exports = router;
