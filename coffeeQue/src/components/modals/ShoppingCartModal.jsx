import {
	Modal,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Button,
	Divider,
	IconButton,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../contexts/ShoppingCartContext";

export default function ShoppingCartModal({ open, onClose, onCheckout }) {
	const { cartItems, removeFromCart, clearCart, updateQty } = useCart();

	const subtotal = cartItems.reduce(
		(sum, item) => sum + (item.price || 0) * (item.qty || 1),
		0
	);

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					boxShadow: 24,
					borderRadius: 2,
					p: 3,
				}}
			>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
					<Typography variant="h6">Shopping Cart</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Divider />
				<List sx={{ mt: 2, maxHeight: 300, overflow: "auto" }}>
					{cartItems.length === 0 ? (
						<Typography sx={{ mt: 4, textAlign: "center" }}>
							Your cart is empty
						</Typography>
					) : (
						cartItems.map((item) => (
							<ListItem
								key={item._id}
								secondaryAction={
									<IconButton
										edge="end"
										color="error"
										onClick={() => removeFromCart(item._id)}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={item.itemName}
									secondary={
										<>
											Qty:
											<TextField
												size="small"
												type="number"
												value={item.qty}
												onChange={(e) =>
													updateQty(item._id, Math.max(1, Number(e.target.value)))
												}
												sx={{ mx: 1, width: 50 }}
											/>
											• ${item.price.toFixed(2)}
										</>
									}
								/>
							</ListItem>
						))
					)}
				</List>

				<Divider sx={{ my: 2 }} />
				<Typography variant="subtitle1" sx={{ textAlign: "right", mb: 2 }}>
					Total: ${subtotal.toFixed(2)}
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Button variant="outlined" color="error" onClick={clearCart}>
						Clear
					</Button>
					<Button variant="contained" onClick={onCheckout}>
						Checkout →
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
