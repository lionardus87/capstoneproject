import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Typography,
	Container,
	Grid,
	Button,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductsContext";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

export default function ProductListPage() {
	const { venueId } = useParams();
	const { products, isLoading, error, refreshProducts } = useProducts();
	const { auth } = useAuth();
	const isAdminOwner = auth.isLogin && auth.user?.role === "admin";
	const { openModal } = useModal();

	useEffect(() => {
		if (auth.isLoading) return;

		if (isAdminOwner) {
			refreshProducts();
		} else if (venueId) {
			refreshProducts(venueId);
		}
	}, [auth.isLoading, isAdminOwner, venueId]);

	// Filters category and search bar
	const [categoryFilter, setCategoryFilter] = React.useState("all");
	const [searchTerm, setSearchTerm] = React.useState("");

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			if (categoryFilter !== "all" && product.category !== categoryFilter) {
				return false;
			}
			if (
				searchTerm &&
				!product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return false;
			}
			return true;
		});
	}, [products, categoryFilter, searchTerm]);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Box
			sx={{
				py: 6,
				px: { xs: 2, sm: 4, md: 6 },
				bgcolor: "background.default",
				minHeight: "100vh",
				overflowX: "hidden",
			}}
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Typography variant="h4" fontWeight="bold" color="primary.main">
					Menu
				</Typography>

				{isAdminOwner && (
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() =>
							openModal("addModal", {
								refreshProducts,
								venueId,
							})
						}
						sx={{
							backgroundColor: "secondary.main",
							color: "common.white",
							textTransform: "none",
							fontWeight: "bold",
							"&:hover": { backgroundColor: "secondary.dark" },
						}}
					>
						Add Product
					</Button>
				)}
			</Box>

			{/* Filter Buttons and Search Bar */}
			<Box
				mb={3}
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 2,
				}}
			>
				{/* Filter Buttons */}
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
					{["all", "Drinks", "Foods"].map((cat) => (
						<Button
							key={cat}
							variant={categoryFilter === cat ? "contained" : "outlined"}
							onClick={() => setCategoryFilter(cat)}
							sx={{ textTransform: "capitalize" }}
						>
							{cat}
						</Button>
					))}
				</Box>

				{/* Search Bar */}
				<Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "250px" } }}>
					<TextField
						fullWidth
						label="Search Products"
						variant="outlined"
						size="small"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</Box>
			</Box>

			{/* Products Grid */}
			{filteredProducts.length === 0 ? (
				<Typography textAlign="center" color="text.secondary" mt={4}>
					No products to show.
				</Typography>
			) : (
				<Grid container spacing={4}>
					{filteredProducts.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							onEdit={() =>
								openModal("editModal", {
									product,
									refreshProducts,
									isAdmin: isAdminOwner,
									venueId,
								})
							}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
}
