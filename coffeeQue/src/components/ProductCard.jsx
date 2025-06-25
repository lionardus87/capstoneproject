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

export default function ProductCard({ product, onEdit }) {
	const { auth } = useAuth();
	const { addToCart } = useCart();

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

	return (
		<Grid item xs={12} sm={6} md={4}>
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
					<Typography variant="h6" fontWeight="bold">
						{product.itemName}
					</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{product.description || "No description"}
					</Typography>
					<Typography fontWeight="bold" mt={1}>
						${product.price?.toFixed(2) || "0.00"}
					</Typography>
				</CardContent>
				<CardActions>
					{isAdminOwner && (
						<Button
							size="small"
							variant="outlined"
							onClick={() => onEdit && onEdit(product)}
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
								sx={{ mt: 1, mb: 1, width: "100%" }}
							/>
							<Button
								size="small"
								variant="outlined"
								fullWidth
								onClick={handleAddToCart}
							>
								Add to cart
							</Button>
						</>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
}
