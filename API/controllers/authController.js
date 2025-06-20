const {
	findUser,
	findVenue,
	createUser,
	createVenue,
	checkPassword,
} = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const register = async (userBody) => {
	const { username, email, password } = userBody;
	// console.log("Register payload:", userBody);

	//Check for existing user
	const existingUser = await findUser({ $or: [{ username }, { email }] });
	// console.log("Existing user?", existingUser);
	if (existingUser) return null;

	//Hash and save
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await createUser({
		username,
		email,
		password: hashedPassword,
	});
	// console.log("New user created:", user);
	return user;
};

const registerVenue = async (venueData, userId) => {
	const { venueName, city, postcode, logoUrl } = venueData;
	console.log("Register payload:", venueData);
	console.log("Register payload:", userId);

	//Check for existing venue
	const existingVenue = await findVenue({ venueName });

	if (existingVenue) {
		console.log("Venue name already taken in Venue collection.");
		return { error: "Venue namealready taken" };
	}

	const venue = await createVenue({
		venueName,
		city,
		postcode,
		logoUrl,
		admin: userId,
	});
	console.log("New venue created:", venue);
	return venue;
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

	const payload = {
		_id: user._id,
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

module.exports = { register, registerVenue, login, generateAccessToken };
