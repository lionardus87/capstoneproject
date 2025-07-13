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

	username = username.trim().toLowerCase();
	email = email.trim().toLowerCase();

	//Check for existing username or email
	const existingUser = await findUser({ $or: [{ username }, { email }] });

	if (existingUser) {
		if (existingUser.username === username) {
			const err = new Error("Username already exists");
			err.field = "username";
			throw err;
		}
		if (existingUser.email === email) {
			const err = new Error("Email already exists");
			err.field = "email";
			throw err;
		}
		const err = new Error("User already exists");
		err.field = "root";
		throw err;
	}

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

	const normalizedCity = city.trim().toLowerCase();
	const normalizedPostcode = postcode.trim();
	const trimmedVenueName = venueName.trim().toLowerCase();

	// Check for existing venue with same name and location
	const existingVenue = await findVenue({
		venueName: trimmedVenueName,
		city: normalizedCity,
		postcode: normalizedPostcode,
	});

	if (existingVenue) {
		return { error: "Venue already registered at this location" };
	}

	const venue = await createVenue({
		venueName: trimmedVenueName,
		city: normalizedCity,
		postcode: normalizedPostcode,
		logoUrl: logoUrl.trim(),
		admin: userId,
	});

	await updateUserRole(userId, "admin");
	return venue;
};

const login = async ({ identifier, password }) => {
	if (!identifier || !password)
		return { error: "Username and password are required." };

	// Find and validate
	const info = identifier.includes("@")
		? { email: identifier, password }
		: { username: identifier, password };

	const result = await checkPassword(info);

	if (!result.success) {
		if (result.reason === "identifier") {
			return { error: "Username or email not found.", field: "identifier" };
		}
		if (result.reason === "password") {
			return { error: "Incorrect password.", field: "password" };
		}
		return { error: "Login failed." }; // fallback
	}

	const user = result.user;

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
