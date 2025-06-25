import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Snackbar,
	Alert,
	Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import useSnackbar from "../../hooks/useSnackbar";
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { venueId } = useParams();
	const { snackbar, showSnackbar, handleClose } = useSnackbar();
	const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
				await refreshProducts(isAdmin ? undefined : venueId); // <-- trigger refresh
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
			<Dialog open={open} onClose={onClose} fullWidth disableScrollLock>
				<DialogTitle
					sx={{
						backgroundColor: "#F7F9F3",
						color: "#435A12",
						textAlign: "center",
						fontWeight: "bold",
						p: 3,
					}}
				>
					Edit Product
					{isAdmin && (
						<IconButton
							onClick={() => setConfirmDeleteOpen(true)}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
							}}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</DialogTitle>
				<DialogContent sx={{ backgroundColor: "#F7F9F3" }}>
					<Box sx={{ pt: 2, px: 6 }}>
						<Stack spacing={2}>
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
				</DialogContent>
				<DialogActions
					sx={{
						backgroundColor: "#F7F9F3",
						justifyContent: "space-evenly",
						px: 3,
						pb: 2,
					}}
				>
					<Button
						variant="contained"
						onClick={onClose}
						sx={{ textTransform: "none", backgroundColor: "#fff", color: "#435A12" }}
					>
						Cancel
					</Button>

					<Button
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						sx={{
							backgroundColor: "#7E8E20",
							color: "#fff",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "#5E6F1A",
							},
						}}
					>
						Save
					</Button>
					{/* <Button
						variant="contained"
						onClick={() => setConfirmDeleteOpen(true)}
						sx={{
							backgroundColor: "red",
							color: "#fff",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "#5E6F1A",
							},
						}}
					>
						Delete
					</Button> */}
				</DialogActions>
			</Dialog>

			{/* Snackbar delete confirm */}
			<Snackbar
				open={confirmDeleteOpen}
				autoHideDuration={5000}
				onClose={() => setConfirmDeleteOpen(false)}
				message={`Delete "${product?.itemName}"?`}
				action={
					<>
						<Button color="error" size="small" onClick={handleDelete}>
							YES
						</Button>
						<Button
							color="inherit"
							size="small"
							onClick={() => setConfirmDeleteOpen(false)}
						>
							NO
						</Button>
					</>
				}
			/>

			{/* Snackbar toast */}
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
