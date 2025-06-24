const {
	findUser,
	findVenue,
	createUser,
	createVenue,
	checkPassword,
	findAdminVenue,
	updateUserRole,
} = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateKey, refreshTokenKey } = require("../utils/const");

const register = async (userBody) => {
	const { username, email, password } = userBody;

	//Check for existing user
	const existingUser = await findUser({ $or: [{ username }, { email }] });
	if (existingUser) return null;

	//Hash and save
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await createUser({
		username,
		email,
		password: hashedPassword,
	});
	return user;
};

const registerVenue = async (venueData, userId) => {
	const { venueName, city, postcode, logoUrl } = venueData;
	console.log("Register payload:", venueData);
	console.log("Register payload:", userId);

	//Check for existing venue
	const existingVenue = await findVenue({ venueName });

	if (existingVenue) {
		return { error: "Venue name already taken" };
	}

	const venue = await createVenue({
		venueName,
		city,
		postcode,
		logoUrl,
		admin: userId,
	});
	const updateRole = await updateUserRole(userId, "admin");
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

	if (user.role === "admin") {
		const venue = await findAdminVenue(user._id);
		payload.venueId = venue?._id;
	}

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
