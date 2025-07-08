import { useState } from "react";
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
	Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../contexts/ShoppingCartContext";
import { cartCheckout } from "../../API/orderAPI";
import { useSnackbar } from "../../contexts/SnackBarContext";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmDialog from "../ConfirmDialog";

export default function ShoppingCartModal({ open, onClose }) {
	const { cartItems, removeFromCart, clearCart, updateQty } = useCart();
	const { auth } = useAuth();
	const { showSnackbar } = useSnackbar();
	const userId = auth.user?._id;

	const [confirmCheckoutOpen, setConfirmCheckoutOpen] = useState(false);
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const subtotal = cartItems.reduce(
		(sum, venue) =>
			sum +
			venue.items.reduce((venueSum, item) => {
				const addonsTotal = Array.isArray(item.addons)
					? item.addons.reduce((total, addon) => total + (addon.price || 0), 0)
					: 0;
				return venueSum + (item.price + addonsTotal) * item.qty;
			}, 0),
		0
	);

	const handleCheckout = async () => {
		if (!cartItems.length) {
			showSnackbar("Cart is empty", "warning");
			return;
		}

		setIsCheckingOut(true);

		try {
			// Send one request per venue
			const orderResults = await Promise.all(
				cartItems.map(({ venueId, items }) => {
					const payload = {
						venueId,
						items: items.map((item) => ({
							productId: item._id,
							qty: item.qty,
							addons: item.addons || [],
						})),
					};
					return cartCheckout(userId, payload);
				})
			);

			const allSuccess = orderResults.every((res) => res.success);

			if (allSuccess) {
				showSnackbar("All orders placed successfully", "success");
				clearCart();
				onClose();
			} else {
				const failed = orderResults.find((res) => !res.success);
				showSnackbar(
					failed?.message || "Some orders failed. Please try again.",
					"error"
				);
			}
		} catch (err) {
			console.error("Checkout error", err);
			showSnackbar(err.message || "Unexpected error", "error");
		} finally {
			setConfirmCheckoutOpen(false);
			setIsCheckingOut(false);
		}
	};

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 500,
						bgcolor: "background.paper",
						boxShadow: 24,
						borderRadius: 2,
						p: 3,
						maxHeight: "90vh",
						overflowY: "auto",
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Typography variant="h6">Shopping Cart</Typography>
						<Tooltip title="Close">
							<IconButton onClick={onClose}>
								<CloseIcon />
							</IconButton>
						</Tooltip>
					</Box>

					<Divider />

					{cartItems.length === 0 ? (
						<Typography sx={{ mt: 4, textAlign: "center" }}>
							Your cart is empty
						</Typography>
					) : (
						<List sx={{ mt: 2 }}>
							{cartItems.map((venue) => (
								<Box key={venue.venueId} sx={{ mb: 2 }}>
									<Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
										{venue.venueName}
									</Typography>
									{venue.items.map((item) => {
										console.log("Cart item:", item); // 🔍 ADD THIS

										return (
											<ListItem
												key={item._id}
												secondaryAction={
													<Tooltip title="Remove">
														<IconButton
															edge="end"
															color="error"
															onClick={() => removeFromCart(venue.venueId, item._id)}
														>
															<CloseIcon />
														</IconButton>
													</Tooltip>
												}
											>
												<ListItemText
													primary={
														<Typography fontWeight="bold">{item.itemName}</Typography>
													}
													secondary={
														item.addons?.length > 0 && (
															<Box component="ul" sx={{ pl: 2, mb: 0 }}>
																{item.addons.map((addon, idx) => (
																	<li key={idx}>
																		<Typography variant="body2" color="text.secondary">
																			{addon.label}
																			{addon.price ? ` +$${addon.price.toFixed(2)}` : ""}
																		</Typography>
																	</li>
																))}
															</Box>
														)
													}
												/>
												<Box sx={{ ml: 2 }}>
													<Typography variant="body2" component="span">
														Qty:
													</Typography>
													<TextField
														size="small"
														type="number"
														value={item.qty}
														inputProps={{ min: 1, step: 1 }}
														onChange={(e) =>
															updateQty(
																venue.venueId,
																item._id,
																Math.max(1, Number(e.target.value))
															)
														}
														sx={{ mx: 1, width: 50 }}
													/>
													<Typography variant="body2" component="span">
														• $
														{(
															item.price +
															(Array.isArray(item.addons)
																? item.addons.reduce((sum, a) => sum + (a.price || 0), 0)
																: 0)
														).toFixed(2)}
													</Typography>
												</Box>
											</ListItem>
										);
									})}
								</Box>
							))}
						</List>
					)}

					<Divider sx={{ my: 2 }} />

					<Typography variant="subtitle1" sx={{ textAlign: "right", mb: 2 }}>
						Total: ${subtotal.toFixed(2)}
					</Typography>

					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Button
							variant="outlined"
							color="error"
							onClick={clearCart}
							disabled={isCheckingOut}
						>
							Clear
						</Button>
						<Button
							variant="contained"
							onClick={() => setConfirmCheckoutOpen(true)}
							disabled={cartItems.length === 0 || isCheckingOut}
						>
							{isCheckingOut ? "Processing..." : "Checkout →"}
						</Button>
					</Box>
				</Box>
			</Modal>

			<ConfirmDialog
				open={confirmCheckoutOpen}
				onCancel={() => setConfirmCheckoutOpen(false)}
				onConfirm={handleCheckout}
				title="Confirm checkout?"
				description="Are you sure you want to place this order?"
				confirmText="Place Order"
				cancelText="Cancel"
				confirmColor="primary"
			/>
		</>
	);
}
