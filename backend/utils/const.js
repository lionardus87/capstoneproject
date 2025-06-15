require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

if (!privateKey || !refreshTokenKey) {
	throw new Error("JWT keys are missing in .env file");
}

module.exports = {
	privateKey,
	refreshTokenKey,
};
