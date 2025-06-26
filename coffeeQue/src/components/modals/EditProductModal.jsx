import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Stack,
	IconButton,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import BaseModal from "./BaseModal";
import { useSnackbar } from "../../contexts/SnackBarContext";
import ConfirmDialog from "../ConfirmDialog";
import {
	deleteProductRequest,
	updateProductRequest,
} from "../../API/productAPI";

export default function EditProductModal({
	open,
	onClose,
	product,
	onSave,
	refreshProducts,
	isAdmin,
}) {
	const { venueId } = useParams();
	const { showSnackbar } = useSnackbar();
	const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (product) {
			reset({
				itemName: product.itemName || "",
				description: product.description || "",
				price: product.price || 0,
				category: product.category || "",
				imageUrl: product.imageUrl || "",
			});
		}
	}, [product, reset]);

	const onSubmit = async (data) => {
		try {
			const result = await updateProductRequest(venueId, product._id, data);
			if (result.success) {
				showSnackbar("Product updated successfully!", "success");
				onSave(result.updatedProduct);
				onClose();
			} else {
				showSnackbar(result.message || "Failed to update product", "error");
			}
		} catch (err) {
			showSnackbar(err.message || "Unexpected error", "error");
			console.error(err);
		}
	};

	const handleDelete = async () => {
		try {
			const result = await deleteProductRequest(venueId, product._id);
			if (result.success) {
				showSnackbar("Product deleted successfully", "success");
				await refreshProducts(isAdmin ? undefined : venueId);
				onClose();
			} else {
				showSnackbar(result.message || "Delete failed", "error");
			}
		} catch (error) {
			console.error(error);
			showSnackbar("Delete failed", "error");
		} finally {
			setConfirmDeleteOpen(false);
		}
	};

	return (
		<>
			<BaseModal
				open={open}
				onClose={onClose}
				title={
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography variant="h6" color="primary.main">
							Edit Product
						</Typography>
						{isAdmin && (
							<IconButton onClick={() => setConfirmDeleteOpen(true)}>
								<DeleteIcon color="secondary" />
							</IconButton>
						)}
					</Box>
				}
				actions={
					<>
						<Button
							variant="contained"
							onClick={onClose}
							sx={{
								textTransform: "none",
								backgroundColor: "#fff",
								color: "primary.main",
							}}
						>
							Cancel
						</Button>

						<Button
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							sx={{
								backgroundColor: "primary.main",
								color: "#fff",
								textTransform: "none",
								"&:hover": {
									backgroundColor: "primary.dark",
								},
							}}
						>
							Save
						</Button>
					</>
				}
			>
				<Box sx={{ pt: 2 }}>
					<Stack spacing={3} sx={{ px: 4 }}>
						<TextField
							label="Item Name"
							{...register("itemName", { required: "Item name is required" })}
							error={!!errors.itemName}
							helperText={errors.itemName?.message}
							fullWidth
						/>

						<TextField
							label="Description"
							{...register("description")}
							fullWidth
							multiline
							rows={3}
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
							fullWidth
						/>

						<TextField
							label="Category"
							{...register("category", { required: "Category is required" })}
							error={!!errors.category}
							helperText={errors.category?.message}
							fullWidth
						/>

						<TextField label="Image URL" {...register("imageUrl")} fullWidth />
					</Stack>
				</Box>
			</BaseModal>

			{/* Delete confirmation dialog */}
			<ConfirmDialog
				open={confirmDeleteOpen}
				onCancel={() => setConfirmDeleteOpen(false)}
				onConfirm={handleDelete}
				title={`Delete "${product?.itemName}"?`}
				description="This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				confirmColor="error"
			/>
		</>
	);
}
