import axiosInstance from "./axiosInstance";

export const registerUser = async ({ username, email, password }) => {
	try {
		const response = await axiosInstance.post("/auth/register", {
			username,
			email,
			password,
		});
		return { success: true, data: response.data };
	} catch (error) {
		const errorData = error.response?.data;
		return {
			success: false,
			message: errorData?.error || error.message || "Unknown error",
			field: errorData?.field || "root",
		};
	}
};

export const registerVenue = async ({ venueName, city, postcode, logoUrl }) => {
	try {
		const response = await axiosInstance.post("/auth/registervenue", {
			venueName,
			city,
			postcode,
			logoUrl,
		});
		return { success: true, data: response.data };
	} catch (error) {
		const errorData = error.response?.data;
		return {
			success: false,
			message: errorData?.error || error.message,
			field: errorData?.field || "root",
		};
	}
};

export const loginRequest = async ({ identifier, password }) => {
	try {
		const normalizedIdentifier = identifier.trim().toLowerCase();
		const { data } = await axiosInstance.post("/auth/login", {
			identifier: normalizedIdentifier,
			password,
		});
		return {
			success: true,
			user: data.user,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		};
	} catch (error) {
		console.error("loginRequest error:", error);
		const errorData = error.response?.data;
		return {
			success: false,
			message: errorData?.message || error.message || "Login failed",
			field: errorData?.field || null,
		};
	}
};

export const fetchUserWithToken = async () => {
	return await apiProcess(() => axiosInstance.get("/auth/me"));
};

export const getAccessToken = async () => {
	try {
		const token = sessionStorage.getItem("refreshToken");
		const response = await axiosInstance.get("/auth/accessToken", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		sessionStorage.setItem("accessToken", response.data.accessToken);
	} catch (error) {
		console.error("Failed to refresh access token:", error);
		throw error;
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
