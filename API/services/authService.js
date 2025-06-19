const axios = require("axios");
let User = require("../models/User");
const bcrypt = require("bcrypt");

const findUser = async (info) => {
	return await User.findOne(info).exec();
};

const createUser = async (userBody) => {
	const user = await new User(userBody).save();
	return user;
};

const checkPassword = async ({ email, username, password }) => {
	const query = email ? { email } : { username };
	// console.log("Checking for user:", query);

	const user = await User.findOne(query);
	if (!user) {
		// console.log("User not found");
		return null;
	}

	const isValid = await bcrypt.compare(password, user.password);
	// console.log("Password valid:", isValid);

	return isValid ? user : null;
};

module.exports = { findUser, createUser, checkPassword };
