import axios from "axios";

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

	const request = axios.request("http://localhost:3003/auth/me", {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	const result = await apiProcess(request);
	return result;
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

export const apiProcess = async (request) => {
	let count = 0;

	const execute = async () => {
		if (count > 1) throw new Error("Failed after retrying");

		try {
			count++;
			const result = await request;
			return result.data;
		} catch (e) {
			if (e.response?.status === 401 && count < 2) {
				await getAccessToken(); // refresh token
				return await execute(); // retry
			}
			throw e;
		} finally {
			console.log("Attempts:", count);
		}
	};

	return await execute();
};
