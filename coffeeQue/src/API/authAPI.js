import axios from "axios";

// --------------------------- AUTH REQUESTS ---------------------------
export const registerUser = async ({ username, email, password }) => {
	try {
		const response = await axios.post("http://localhost:3003/auth/register", {
			username,
			email,
			password,
		});
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.response?.data || error.message };
	}
};

export const registerVenue = async ({ venueName, city, postcode, logoUrl }) => {
	try {
		const accessToken = sessionStorage.getItem("accessToken");
		const response = await axios.post(
			"http://localhost:3003/auth/registervenue",
			{ venueName, city, postcode, logoUrl },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.response?.data || error.message };
	}
};

export const loginRequest = async ({ identifier, password }) => {
	try {
		const result = await axios.post("http://localhost:3003/auth/login", {
			identifier,
			password,
		});
		// return result.data;
		return { success: true, ...result.data };
	} catch (err) {
		console.error("loginRequest error:", err);
		return {
			success: false,
			message: err.response?.data?.message || err.message || "Login failed",
		};
	}
};
export const fetchUserWithToken = async () => {
	const accessToken = sessionStorage.getItem("accessToken");
	if (!accessToken) throw new Error("No access token found");

	return await apiProcess(() =>
		axios.get("http://localhost:3003/auth/me", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
			},
		})
	);
};

export const getAccessToken = async () => {
	try {
		const token = sessionStorage.getItem("refreshToken");
		const result = await axios.get("http://localhost:3003/auth/accessToken", {
			headers: { Authorization: `Bearer ${token}` },
		});
		sessionStorage.setItem("accessToken", result.data.accessToken);
	} catch (err) {
		console.error("Failed to refresh access token:", err);
		throw err;
	}
};

// Utility: Handles access token refresh and retries once
export const apiProcess = async (makeRequest) => {
	let attempts = 0;

	const execute = async () => {
		if (attempts > 1) throw new Error("Failed after retrying");
		attempts++;
		try {
			const result = await makeRequest();
			return result.data;
		} catch (error) {
			if (error.response?.status === 403 && attempts < 2) {
				await getAccessToken(); // refresh token
				return await execute(); // retry
			}
			throw error;
		} finally {
			console.log("attempts:", attempts);
		}
	};

	return await execute();
};
