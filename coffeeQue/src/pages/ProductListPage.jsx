import React, { useState, useMemo, useEffect } from "react";
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
import AddProductModal from "../components/modals/AddProductModal";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/modals/EditProductModal";
import { useProducts } from "../contexts/ProductsContext";
import { useAuth } from "../contexts/AuthContext";

export default function ProductListPage() {
	const { venueId } = useParams();
	const { products, isLoading, error, refreshProducts } = useProducts();
	const { auth } = useAuth();
	const isAdminOwner = auth.isLogin && auth.user?.role === "admin";

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [addModalOpen, setAddModalOpen] = useState(false);

	useEffect(() => {
		if (auth.isLoading) return;

		if (isAdminOwner) {
			refreshProducts();
		} else if (venueId) {
			refreshProducts(venueId);
		}
	}, [auth.isLoading, isAdminOwner, venueId]);

	// Edit product modal handlers
	const handleEditProduct = (product) => {
		setSelectedProduct(product);
		setEditModalOpen(true);
	};
	const handleCloseEditModal = () => {
		setEditModalOpen(false);
		setSelectedProduct(null);
	};
	const handleSaveEdit = () => {
		refreshProducts();
		handleCloseEditModal();
	};

	// Add product modal handlers
	const handleOpenAddModal = () => setAddModalOpen(true);
	const handleCloseAddModal = () => setAddModalOpen(false);
	const handleSaveAdd = () => {
		refreshProducts();
		handleCloseAddModal();
	};

	// Filters (unchanged)
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

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
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleOpenAddModal}
						sx={{
							backgroundColor: "#7E8E20",
							color: "#fff",
							textTransform: "none",
							fontWeight: "bold",
							"&:hover": { backgroundColor: "#5E6F1A" },
						}}
					>
						Add Product
					</Button>
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

			{/* Edit Product Modal */}
			{selectedProduct && (
				<EditProductModal
					open={editModalOpen}
					onClose={handleCloseEditModal}
					product={selectedProduct}
					onSave={handleSaveEdit}
					refreshProducts={refreshProducts}
					isAdmin={isAdminOwner}
				/>
			)}

			{/* Add Product Modal */}
			<AddProductModal
				open={addModalOpen}
				onClose={handleCloseAddModal}
				onSave={handleSaveAdd}
			/>
		</Container>
	);
}
