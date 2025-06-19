const {
	findUser,
	createUser,
	checkPassword,
} = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const register = async (userBody) => {
	const { username, email, password } = userBody;
	console.log("Register payload:", userBody);

	//Check for existing user
	const existingUser = await findUser({ $or: [{ username }, { email }] });
	console.log("Existing user?", existingUser);
	if (existingUser) return null;

	//Hash and save
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await createUser({
		username,
		email,
		password: hashedPassword,
	});
	console.log("New user created:", user);
	return user;
};

const login = async ({ identifier, password }) => {
	if (!identifier || !password)
		return { error: "Username and password are required." };

	// Find and validate
	const info = identifier.includes("@")
		? { email: identifier, password }
		: { username: identifier, password };
	const user = await checkPassword(info);
	if (!user) return { error: "Invalid username or email." };

	// const info = identifier.includes("@")
	// 	? { email: identifier }
	// 	: { username: identifier };

	// const user = await findUser(info);
	// if (!user) return { error: "Invalid username or email." };

	// const isValid = await bcrypt.compare(password, user.password);
	// if (!isValid) return { error: "Invalid password." };

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
