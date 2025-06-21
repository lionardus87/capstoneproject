import React, { useState } from "react";
import {
	Box,
	Container,
	TextField,
	Typography,
	Button,
	MenuItem,
	Stack,
	Snackbar,
	Alert,
} from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";
import { addMenu } from "../API/venueAPI";

const categories = ["Drinks", "Foods"];

export default function AddMenuItemPage() {
	const [formData, setFormData] = useState({
		itemName: "",
		description: "",
		price: "",
		category: "",
		imageUrl: "",
	});
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = async () => {
		const { itemName, description, price, category, imageUrl } = formData;
		const missingFields = [
			"itemName",
			"description",
			"price",
			"category",
			"imageUrl",
		].filter(
			(field) => typeof formData[field] !== "string" || !formData[field].trim()
		);
		if (missingFields.length > 0) {
			showSnackbar(`${missingFields.join(", ")} field(s) are missing`, "error");
			return;
		}
		try {
			const result = await addMenu({
				itemName,
				description,
				price,
				category,
				imageUrl,
			});
			if (result?.success) {
				showSnackbar("Item has been added to Menu", "success");
				setFormData({
					itemName: "",
					description: "",
					price: "",
					category: "",
					imageUrl: "",
				});
			} else {
				showSnackbar("Submission failed!", "error");
			}
		} catch (error) {
			showSnackbar(
				"Add item failed: " + (error?.message || "Server error"),
				"error"
			);
		}
	};

	return (
		<>
			<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
				<Container maxWidth="sm">
					<Typography
						variant="h4"
						fontWeight="bold"
						color="#435A12"
						textAlign="center"
						mb={4}
					>
						Add New Menu Item
					</Typography>

					<Stack spacing={3} sx={{ backgroundColor: "#fff", p: 4, borderRadius: 3 }}>
						<TextField
							label="Product Name"
							name="itemName"
							value={formData.itemName}
							onChange={handleChange}
						/>
						<TextField
							label="Description"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
						<TextField
							label="Price"
							name="price"
							type="number"
							value={formData.price}
							onChange={handleChange}
						/>
						<TextField
							select
							label="Category"
							name="category"
							value={formData.category}
							onChange={handleChange}
						>
							{categories.map((cat, index) => (
								<MenuItem key={index} value={cat}>
									{cat}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="Menu Image URL"
							name="imageUrl"
							value={formData.imageUrl}
							onChange={handleChange}
						/>

						<Button
							variant="contained"
							onClick={handleSubmit}
							sx={{
								backgroundColor: "#7E8E20",
								color: "#fff",
								textTransform: "none",
								"&:hover": { backgroundColor: "#5E6F1A" },
							}}
						>
							Add Menu Item
						</Button>
					</Stack>
				</Container>
			</Box>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
