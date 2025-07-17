const {
	register,
	registerVenue,
	login,
	generateAccessToken,
} = require("../authController");
const authService = require("../../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../services/authService");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthController", () => {
	describe("register", () => {
		it("should register a new user", async () => {
			authService.findUser.mockResolvedValue(null);
			bcrypt.hash.mockResolvedValue("hashed123");
			authService.createUser.mockResolvedValue({ username: "john" });

			const user = await register({
				username: "John",
				email: "John@example.com",
				password: "pass123",
			});

			expect(authService.findUser).toHaveBeenCalled();
			expect(authService.createUser).toHaveBeenCalledWith(
				expect.objectContaining({ username: "john" })
			);
			expect(user).toEqual({ username: "john" });
		});

		it("should throw error if user exists", async () => {
			authService.findUser.mockResolvedValue({ username: "john" });
			await expect(
				register({ username: "john", email: "john@example.com", password: "pass" })
			).rejects.toThrow("Username already exists");
		});
	});

	// Similar structure for registerVenue
	describe("registerVenue", () => {
		it("should register venue and upgrade user to admin", async () => {
			authService.findVenue.mockResolvedValue(null);
			authService.createVenue.mockResolvedValue({ venueName: "ClubX" });
			authService.updateUserRole.mockResolvedValue();

			const venue = await registerVenue(
				{ venueName: "ClubX", city: "Melbourne", postcode: "3000", logoUrl: "url" },
				"user123"
			);

			expect(authService.createVenue).toHaveBeenCalled();
			expect(authService.updateUserRole).toHaveBeenCalledWith("user123", "admin");
			expect(venue).toEqual({ venueName: "ClubX" });
		});
	});

	// Login test
	describe("login", () => {
		it("should return tokens on successful login", async () => {
			authService.checkPassword.mockResolvedValue({
				success: true,
				user: {
					_id: "id123",
					username: "john",
					email: "john@example.com",
					role: "user",
				},
			});
			jwt.sign.mockReturnValue("token");

			const result = await login({ identifier: "john", password: "pass123" });

			expect(jwt.sign).toHaveBeenCalled();
			expect(result.accessToken).toBe("token");
			expect(result.refreshToken).toBe("token");
		});
	});

	// Refresh token test
	describe("generateAccessToken", () => {
		it("should return a new access token", async () => {
			jwt.verify.mockReturnValue({ _id: "id123", username: "john" });
			jwt.sign.mockReturnValue("newAccess");

			const token = await generateAccessToken("oldRefresh");

			expect(token).toBe("newAccess");
		});
	});
});
