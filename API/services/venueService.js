const axios = require("axios");
const Venue = require("../models/Venue");
const Menu = require("../models/Menu");
const mongoose = require("mongoose");

const findVenueByAdminId = async (adminId) => {
	console.log("findvenueid", adminId);
	return await Venue.findOne({ admin: adminId }).exec();
};

const addMenu = async (menuData) => {
	console.log("addmenu", menuData);
	const item = await new Menu(menuData).save();
	console.log("item", item);
	return item;
};
module.exports = {
	findVenueByAdminId,
	addMenu,
};
