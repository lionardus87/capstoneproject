import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Typography,
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Button,
	CircularProgress,
	Snackbar,
	Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductsContext";
import useSnackbar from "../hooks/useSnackbar";
import EditProductModal from "../components/editProductModal";

export default function ProductListPage() {
	const { venueId } = useParams();
	const { auth } = useAuth();
	const isAdmin = auth.isLogin && auth.user?.role === "admin";
	const { products, isLoading, error, refreshProducts } = useProducts();
	const { snackbar, showSnackbar, handleClose } = useSnackbar();
	const [updating, setUpdating] = useState(null);

	useEffect(() => {
		if (auth.isLoading) return;
		if (isAdmin) {
			refreshProducts();
		} else if (venueId) {
			refreshProducts(venueId);
		}
	}, [auth.isLoading, isAdmin, venueId]);

	const groupedProducts = useMemo(() => {
		if (!Array.isArray(products)) return {};

		return products.reduce((acc, item) => {
			const category = item.category || "Uncategorized";
			if (!acc[category]) acc[category] = [];
			acc[category].push(item);
			return acc;
		}, {});
	}, [products]);

	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Typography color="error" textAlign="center" mt={4}>
				{error}
			</Typography>
		);
	}
	const handleUpdate = async () => {
		showSnackbar("Product updated successfully!", "success");
		await refreshProducts(isAdmin ? undefined : venueId);
	};

	// if (!Array.isArray(products)) {
	// 	console.error("Expected products to be an array, got:", products);
	// 	return (
	// 		<Typography color="error" textAlign="center" mt={4}>
	// 			Unexpected product data format.
	// 		</Typography>
	// 	);
	// }

	return (
		<>
			<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
				<Container>
					<Typography
						variant="h4"
						fontWeight="bold"
						color="#435A12"
						textAlign="center"
						mb={4}
					>
						{isAdmin ? "My Venue Menu" : "Menu"}
					</Typography>

					{Object.entries(groupedProducts).map(([category, items]) => (
						<Box key={category} mb={5}>
							<Typography variant="h5" fontWeight="bold" color="#5E6F1A" mb={2}>
								{category}
							</Typography>
							<Grid container spacing={4}>
								{items.map((item) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										key={item._id}
										sx={{ display: "flex" }}
									>
										<Card
											sx={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												width: "100%",
												borderRadius: 3,
												cursor: "pointer",
												transition: "0.3s",
												"&:hover": {
													boxShadow: 6,
													transform: "scale(1.02)",
												},
											}}
										>
											<CardMedia
												component="img"
												height="180"
												image={item.imageUrl || "/placeholder.jpg"}
												alt={item.itemName}
											/>
											<CardContent sx={{ flexGrow: 1 }}>
												<Typography variant="h6" fontWeight="bold">
													{item.itemName}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ minHeight: 48 }}
												>
													{item.description || "No description"}
												</Typography>
												<Typography fontWeight="bold" mt={1}>
													${item.price?.toFixed(2) || "0.00"}
												</Typography>
											</CardContent>

											{isAdmin && auth.user.venueId === venueId && (
												<CardActions sx={{ px: 2, pb: 2 }}>
													<Button variant="outlined" onClick={() => setUpdating(item)}>
														UPDATE
													</Button>
												</CardActions>
											)}
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					))}
				</Container>
			</Box>
			{/* Update Modal */}
			{updating && (
				<EditProductModal
					open={!!updating}
					product={updating}
					onClose={() => setUpdating(null)}
					onSave={handleUpdate}
					refreshProducts={refreshProducts}
					isAdmin={isAdmin}
				/>
			)}
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
