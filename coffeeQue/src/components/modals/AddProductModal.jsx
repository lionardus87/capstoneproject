import React from "react";
import { TextField, MenuItem, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { addProduct } from "../../API/productAPI";
import useSnackbar from "../../hooks/useSnackbar";
import { useParams } from "react-router-dom";
import BaseModal from "../modals/BaseModal";

const categories = ["Drinks", "Foods"];

export default function AddProductModal({ open, onClose, onSave }) {
	// const theme = useTheme();
	const { venueId } = useParams();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			itemName: "",
			description: "",
			price: 0,
			category: "",
			imageUrl: "",
		},
	});
	const { showSnackbar } = useSnackbar();

	const onSubmit = async (data) => {
		try {
			const result = await addProduct(venueId, data);
			if (result?.success) {
				showSnackbar("Item has been added to the menu", "success");
				onSave?.(); // optional callback
				reset();
				onClose();
			} else {
				showSnackbar("Failed to add product", "error");
			}
		} catch (err) {
			console.error(err);
			showSnackbar(err.message || "Unexpected error", "error");
		}
	};

	return (
		<BaseModal
			open={open}
			onClose={onClose}
			title="Add New Product Item"
			actions={
				<>
					<Button
						onClick={onClose}
						variant="outlined"
						sx={{ textTransform: "none", color: "primary.main" }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant="contained"
						sx={{
							backgroundColor: "primary.main",
							color: "#fff",
							textTransform: "none",
							"&:hover": { backgroundColor: "primary.dark" },
						}}
					>
						Add Product
					</Button>
				</>
			}
		>
			<Stack spacing={3} sx={{ px: 4, pt: 1 }}>
				<TextField
					label="Product Name"
					{...register("itemName", { required: "Item name is required" })}
					error={!!errors.itemName}
					helperText={errors.itemName?.message}
					sx={{ backgroundColor: "background.textfield" }}
					fullWidth
				/>
				<TextField
					label="Description"
					{...register("description", { required: "Description is required" })}
					error={!!errors.description}
					helperText={errors.description?.message}
					sx={{ backgroundColor: "background.textfield" }}
					fullWidth
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
					sx={{ backgroundColor: "background.textfield" }}
					fullWidth
				/>
				<TextField
					select
					label="Category"
					{...register("category", { required: "Category is required" })}
					error={!!errors.category}
					helperText={errors.category?.message}
					sx={{ backgroundColor: "background.textfield" }}
					fullWidth
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
					sx={{ backgroundColor: "background.textfield" }}
					fullWidth
				/>
			</Stack>
		</BaseModal>
	);
}
