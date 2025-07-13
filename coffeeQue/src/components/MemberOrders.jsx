import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	Divider,
	Chip,
	Stack,
	Button,
} from "@mui/material";
import { useOrders } from "../contexts/OrderContext";
import { useSnackbar } from "../contexts/SnackBarContext";
import ConfirmDialog from "../components/ConfirmDialog";

export default function MemberOrders() {
	const { orders, updateOrderStatus } = useOrders();
	const { showSnackbar } = useSnackbar();
	const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState(null);

	const handleStatusUpdate = async (orderId, newStatus) => {
		await updateOrderStatus(orderId, newStatus);
		showSnackbar(`Order ${newStatus}`, "success");
	};
	const onClickCancel = (orderId) => {
		setSelectedOrderId(orderId);
		setConfirmCancelOpen(true);
	};

	const handleCancelOrder = async () => {
		setConfirmCancelOpen(false);
		if (!selectedOrderId) return;
		await updateOrderStatus(selectedOrderId, "Cancelled");
		showSnackbar("Order cancelled", "success");
		setSelectedOrderId(null);
	};
	return (
		<>
			<Container sx={{ py: 6 }}>
				<Typography variant="h4" color="text.secondary" mb={4}>
					My Orders
				</Typography>

				{orders.map((order) => (
					<Paper key={order._id} sx={{ mb: 4, p: 3 }} elevation={2}>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Typography variant="h6">
								Venue: {order.venue?.venueName || "N/A"}
							</Typography>
							<Chip
								label={order.status}
								color={
									order.status === "Ready"
										? "success"
										: ["Rejected", "Cancelled"].includes(order.status)
										? "error"
										: "default"
								}
							/>
						</Box>

						<Typography mt={1} variant="body2" color="text.secondary">
							Ordered on: {new Date(order.createdAt).toLocaleString()}
						</Typography>

						<List dense sx={{ mt: 2 }}>
							{order.products.map((item, idx) => (
								<React.Fragment key={idx}>
									<ListItem>
										<ListItemText
											primary={
												<Typography variant="body1" color="text.primary" fontWeight="bold">
													{item.product.itemName} x{item.qty}
												</Typography>
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

										<Typography>
											$
											{(
												(item.product.price +
													(item.addons?.reduce((sum, a) => sum + (a.price || 0), 0) || 0)) *
												item.qty
											).toFixed(2)}
										</Typography>
									</ListItem>
									<Divider component="li" />
								</React.Fragment>
							))}
						</List>

						<Stack direction="row" justifyContent="flex-end" mt={2} spacing={2}>
							{order.status === "Pending" && (
								<Button
									onClick={() => onClickCancel(order._id)}
									variant="outlined"
									color="error"
								>
									Cancel
								</Button>
							)}
							{order.status === "Ready" && (
								<Button
									variant="outlined"
									color="success"
									onClick={() => handleStatusUpdate(order._id, "Completed")}
									disabled={order.confirmedByMember}
								>
									{order.confirmedByMember ? "Waiting for Admin..." : "Picked Up"}
								</Button>
							)}
						</Stack>
					</Paper>
				))}
			</Container>

			{/* Cancel confirmation dialog */}
			<ConfirmDialog
				open={confirmCancelOpen}
				onCancel={() => setConfirmCancelOpen(false)}
				onConfirm={handleCancelOrder}
				title={`Are you sure want to cancel order?`}
				description="You order will not be refunded."
				confirmText="Cancel"
				cancelText="No"
				confirmColor="error"
			/>
		</>
	);
}
