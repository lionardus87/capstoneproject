import React, { useState } from "react";
import {
	Box,
	Container,
	TextField,
	Typography,
	Button,
	MenuItem,
	Stack,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const categories = ["Coffee", "Food"];

export default function AddMenuItemPage() {
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: null,
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: files ? URL.createObjectURL(files[0]) : value,
		}));
	};

	const handleSubmit = () => {
		console.log("Submitted:", form);
		// Handle saving to backend
	};

	return (
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
						name="name"
						value={form.name}
						onChange={handleChange}
					/>
					<TextField
						label="Description"
						name="description"
						value={form.description}
						onChange={handleChange}
					/>
					<TextField
						label="Price"
						name="price"
						type="number"
						value={form.price}
						onChange={handleChange}
					/>
					<TextField
						select
						label="Category"
						name="category"
						value={form.category}
						onChange={handleChange}
					>
						{categories.map((cat, index) => (
							<MenuItem key={index} value={cat}>
								{cat}
							</MenuItem>
						))}
					</TextField>
					<Button
						variant="outlined"
						component="label"
						sx={{
							color: "#435A12",
							borderColor: "#7E8E20",
							"&:hover": { color: "#5E6F1A", borderColor: "#5E6F1A" },
						}}
					>
						<AddPhotoAlternateIcon sx={{ mr: 1 }} />
						Upload Image
						<input type="file" name="image" hidden onChange={handleChange} />
					</Button>

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
	);
}
