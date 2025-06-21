import axios from "axios";

export const addMenu = async ({
	itemName,
	description,
	price,
	category,
	imageUrl,
}) => {
	try {
		const accessToken = sessionStorage.getItem("accessToken");
		const response = await axios.post(
			"http://localhost:3003/api/venues/menu",
			{
				itemName,
				description,
				price,
				category,
				imageUrl,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, message: error.response?.data || error.message };
	}
};
