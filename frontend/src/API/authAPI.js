import axios from "axios";

export const loginRequest = async ({ identifier, password }) => {
	const result = await axios.post("http://localhost:3003/api/auth/login", {
		identifier,
		password,
	});
	return result.data;
};

export const registerUser = async ({ username, email, password }) => {
	try {
		const response = await axios.post("http://localhost:3003/api/auth/register", {
			username,
			email,
			password,
		});
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.response?.data || error.message };
	}
};

export const getLoginedUser = async () => {
	const token = sessionStorage.getItem("accessToken");
	const request = axios.request("http://localhost:3003/api/auth/me", {
		headers: { Authorization: `Bearer ${token}` },
	});

	const result = await apiProcess(request);
	return result;
};

export const getAccessToken = async () => {
	const token = sessionStorage.getItem("refreshToken");
	const result = await axios.get("http://localhost:3003/api/auth/accessToken", {
		headers: { Authorization: `Bearer ${token}` },
	});
	sessionStorage.setItem("accessToken", result.data.accessToken);
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
