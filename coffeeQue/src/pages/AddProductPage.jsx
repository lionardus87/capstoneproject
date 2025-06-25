import React from "react";
import { useParams } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { addProduct } from "../API/productAPI";

const categories = ["Drinks", "Foods"];

export default function AddProductPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { snackbar, showSnackbar, handleClose } = useSnackbar();
	const { venueId } = useParams();

	const onSubmit = async (data) => {
		try {
			console.log("venueId", venueId);
			const result = await addProduct(venueId, data);
			if (result?.success) {
				showSnackbar("Item has been added to Menu", "success");
				reset(); // clear form
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
						Add New Product Item
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack
							spacing={3}
							sx={{ backgroundColor: "#fff", p: 4, borderRadius: 3 }}
						>
							<TextField
								label="Product Name"
								{...register("itemName", { required: "Item name is required" })}
								error={!!errors.itemName}
								helperText={errors.itemName?.message}
							/>
							<TextField
								label="Description"
								{...register("description", { required: "Description is required" })}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>
							<TextField
								label="Price"
								type="number"
								inputProps={{ min: 0 }}
								{...register("price", {
									required: "Price is required",
									valueAsNumber: true,
								})}
								error={!!errors.price}
								helperText={errors.price?.message}
							/>
							<TextField
								select
								label="Category"
								{...register("category", { required: "Category is required" })}
								error={!!errors.category}
								helperText={errors.category?.message}
							>
								{categories.map((cat, index) => (
									<MenuItem key={index} value={cat}>
										{cat}
									</MenuItem>
								))}
							</TextField>
							<TextField
								label="Image URL"
								{...register("imageUrl", { required: "Image URL is required" })}
								error={!!errors.imageUrl}
								helperText={errors.imageUrl?.message}
							/>

							<Button
								variant="contained"
								type="submit"
								sx={{
									backgroundColor: "#7E8E20",
									color: "#fff",
									textTransform: "none",
									"&:hover": { backgroundColor: "#5E6F1A" },
								}}
							>
								Add Product
							</Button>
						</Stack>
					</form>
				</Container>
			</Box>

			{/* Snackbar delete confirm */}
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
