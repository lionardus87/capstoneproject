const {
	findUserByEmail,
	createUser,
	checkPassword,
} = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const register = async (userBody) => {
	const { username, email, password } = userBody;
	const existing = await findUserByEmail(email);

	if (existing?.length > 0) return null;

	const hashedPassword = await bcrypt.hash(password, 10);
	const userData = await createUser({
		username,
		email,
		password: hashedPassword,
	});

	return userData;
};

const login = async ({ identifier, password }) => {
	let user;

	// Check if identifier is an email or username
	if (identifier.includes("@")) {
		user = await checkPassword({ email: identifier, password });
	} else {
		user = await checkPassword({ username: identifier, password });
	}

	if (!user) return null;

	const payload = {
		id: user._id,
		username: user.username,
		email: user.email,
		role: user.role,
	};
	const accessToken = jwt.sign(payload, privateKey, { expiresIn: "3h" });
	const refreshToken = jwt.sign(payload, refreshTokenKey, { expiresIn: "1d" });

	return { user: payload, accessToken, refreshToken };
};

const generateAccessToken = async (refreshToken) => {
	const payload = jwt.verify(refreshToken, refreshTokenKey);
	delete payload.iat;
	delete payload.exp;

	return jwt.sign(payload, privateKey, { expiresIn: "3h" });
};

module.exports = { register, login, generateAccessToken };
