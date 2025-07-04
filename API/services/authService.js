const axios = require("axios");
let User = require("../models/User");
const bcrypt = require("bcrypt");
const Venue = require("../models/Venue");

const findUser = async (info) => {
	return await User.findOne(info).exec();
};

const createUser = async (userBody) => {
	const user = await new User(userBody).save();
	return user;
};

const findVenue = async (info) => {
	return await Venue.findOne(info).exec();
};

const findAdminVenue = async (adminId) => {
	return await Venue.findOne({ admin: adminId }).exec();
};

const createVenue = async (venueData) => {
	const user = await new Venue(venueData).save();
	return user;
};

const updateUserRole = async (userId, role = "admin") => {
	const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
	return user;
};

const checkPassword = async ({ email, username, password }) => {
	const query = email ? { email } : { username };
	const user = await User.findOne(query);

	if (!user) {
		return { success: false, reason: "identifier" };
	}

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) {
		return { success: false, reason: "password" };
	}

	return { success: true, user };
};

module.exports = {
	findUser,
	findVenue,
	createVenue,
	createUser,
	checkPassword,
	findAdminVenue,
	updateUserRole,
};
