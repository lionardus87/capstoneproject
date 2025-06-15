const axios = require("axios");
let User = require("../models/User");

const findUserByEmail = async (emailId) => {
	const response = await axios.get(
		`http://localhost:3003/api/users?emailId=${emailId}`
	);
	return response.data;
};

const createUser = async (userData) => {
	const user = await new User(userData).save();
	return user;
};

const checkPassword = async (userData) => {
	const response = await axios.post(
		"http://localhost:3003/api/users/checkPassword",
		userData
	);
	return response.data;
};

module.exports = { findUserByEmail, createUser, checkPassword };
