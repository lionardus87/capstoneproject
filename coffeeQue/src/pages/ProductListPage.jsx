import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Typography,
	Container,
	Grid,
	Button,
	TextField,
	IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/modals/EditProductModal";
import { useProducts } from "../contexts/ProductsContext";
import { useAuth } from "../contexts/AuthContext";

export default function ProductListPage({ onAddProduct }) {
	const { venueId } = useParams();
	const { products, isLoading, error, refreshProducts } = useProducts();
	const { auth } = useAuth();
	const isAdminOwner = auth.isLogin && auth.user?.role === "admin";

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		if (auth.isLoading) return;

		if (isAdminOwner) {
			refreshProducts(); // will use admin's own venueId
		} else if (venueId) {
			refreshProducts(venueId); // guest/member needs venueId from URL
		}
	}, [auth.isLoading, isAdminOwner, venueId]);

	// Admin - Edit product
	const handleEditProduct = (product) => {
		setSelectedProduct(product);
		setEditModalOpen(true);
	};

	const handleCloseModal = () => {
		setEditModalOpen(false);
		setSelectedProduct(null);
	};

	const handleSave = () => {
		refreshProducts(); // after update or delete
		handleCloseModal();
	};

	// Filter state: category and search
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			// Filter by category
			if (categoryFilter !== "all" && product.category !== categoryFilter) {
				return false;
			}
			// Filter by search term (case insensitive)
			if (
				searchTerm &&
				!product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return false;
			}
			return true;
		});
	}, [products, categoryFilter, searchTerm]);

	// Render
	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Container sx={{ py: 6, bgcolor: "#F7F9F3", minHeight: "100vh" }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Typography variant="h4" fontWeight="bold" color="#435A12">
					Menu
				</Typography>
				{isAdminOwner && (
					<IconButton
						color="#435A12"
						onClick={onAddProduct}
						aria-label="Add Product"
					>
						<AddIcon />
						<Typography variant="h6" fontWeight="bold" color="#435A12">
							Add product
						</Typography>
					</IconButton>
				)}
			</Box>

			{/* Filter Buttons */}
			<Box mb={3}>
				{["Drinks", "Foods", "all"].map((cat) => (
					<Button
						key={cat}
						variant={categoryFilter === cat ? "contained" : "outlined"}
						onClick={() => setCategoryFilter(cat)}
						sx={{ mr: 1, textTransform: "capitalize" }}
					>
						{cat}
					</Button>
				))}
			</Box>

			{/* Search Bar */}
			<TextField
				label="Search Products"
				variant="outlined"
				size="small"
				fullWidth
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				sx={{ mb: 4 }}
			/>

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
							onEdit={handleEditProduct}
						/>
					))}
				</Grid>
			)}

			{/* Edit modal */}
			{selectedProduct && (
				<EditProductModal
					open={editModalOpen}
					onClose={handleCloseModal}
					product={selectedProduct}
					onSave={handleSave}
					refreshProducts={refreshProducts}
					isAdmin={isAdminOwner}
				/>
			)}
		</Container>
	);
}
