import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Button,
	Typography,
	Grid,
	TextField,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/ShoppingCartContext";
import { useModal } from "../contexts/ModalContext";

export default function ProductCard({ product, onEdit }) {
	const { auth } = useAuth();
	const { addToCart } = useCart();
	const { openModal } = useModal();

	const [qty, setQty] = useState(1);

	const isAdminOwner =
		auth.isLogin &&
		auth.user?.role === "admin" &&
		auth.user.venueId === product.venue?.toString();
	const isMember = auth.isLogin && auth.user?.role === "member";

	const handleAddToCart = () => {
		const quantity = parseInt(qty, 10);
		if (!quantity || quantity < 1) return;

		addToCart({ ...product, qty: quantity });

		setQty("1");
	};

	const handleAddWithAddons = () => {
		openModal("addon", {
			product,
			onConfirm: (productWithAddons, addons) => {
				addToCart({ ...productWithAddons, addons, qty: 1 });
			},
		});
	};

	const capitalizeWords = (str) =>
		str.replace(/\b\w/g, (char) => char.toUpperCase());

	return (
		<Grid container spacing={1} size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
			<Card
				sx={{
					height: "100%",
					width: "200px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<CardMedia
					component="img"
					height="180"
					image={product.imageUrl || "/placeholder.jpg"}
					alt={product.itemName}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography variant="h6">{capitalizeWords(product.itemName)}</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{product.description || "No description"}
					</Typography>
					<Typography fontWeight="bold" mt={1}>
						${product.price?.toFixed(2) || "0.00"}
					</Typography>
				</CardContent>
				<CardActions sx={{ justifyContent: "end" }}>
					{isAdminOwner && (
						<Button
							size="small"
							variant="outlined"
							onClick={() => onEdit && onEdit(product)}
							sx={{
								textTransform: "none",
								backgroundColor: "#fff",
								color: "primary.main",
							}}
						>
							Edit
						</Button>
					)}
					{isMember && (
						<>
							<TextField
								size="small"
								type="number"
								inputProps={{ min: 1 }}
								value={qty}
								onChange={(e) => setQty(e.target.value)}
								sx={{ my: 1, width: "100%" }}
							/>

							{product.category === "Drinks" ? (
								<Button
									size="small"
									variant="contained"
									fullWidth
									color="secondary"
									onClick={handleAddWithAddons}
								>
									Add to Cart
								</Button>
							) : (
								<Button
									size="small"
									variant="outlined"
									fullWidth
									onClick={handleAddToCart}
								>
									Add to Cart
								</Button>
							)}
						</>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
}
