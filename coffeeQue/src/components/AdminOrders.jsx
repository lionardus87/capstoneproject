import React from "react";
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

export default function AdminOrders() {
	const { orders, updateOrderStatus } = useOrders();
	const { showSnackbar } = useSnackbar();

	const formatDateTime = (dateString) => {
		const d = new Date(dateString);
		const day = String(d.getDate()).padStart(2, "0");
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const year = d.getFullYear();

		const hours = String(d.getHours()).padStart(2, "0");
		const minutes = String(d.getMinutes()).padStart(2, "0");
		const seconds = String(d.getSeconds()).padStart(2, "0");

		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	};

	const handleStatusUpdate = async (orderId, newStatus) => {
		await updateOrderStatus(orderId, newStatus);
		showSnackbar(`Order marked as ${newStatus}`, "success");
	};

	return (
		<Container sx={{ py: 6 }}>
			<Typography variant="h4" mb={4} color="text.secondary">
				Incoming Orders
			</Typography>

			{[...orders]
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.map((order) => (
					<Paper
						key={order._id}
						sx={{ mb: 4, p: 3, backgroundColor: "background.paper", borderRadius: 3 }}
						elevation={2}
					>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Typography variant="h6">
								From: {order.member?.username} –{" "}
								{formatDateTime(order.createdAt).toLocaleString()}
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

						<List dense sx={{ mt: 2 }}>
							{order.products.map((item, idx) => (
								<React.Fragment key={idx}>
									<ListItem alignItems="flex-start">
										<Box sx={{ flexGrow: 1 }}>
											<Typography variant="body1" color="text.primary" fontWeight="bold">
												{item.product.itemName} x{item.qty}
											</Typography>

											{item.addons?.length > 0 && (
												<Box component="ul" sx={{ pl: 2, mb: 0, mt: 0.5 }}>
													{item.addons.map((addon, idx) => (
														<li key={idx}>
															<Typography
																variant="body2"
																color="text.secondary"
																component="span"
															>
																{addon.label}
																{addon.price ? ` +$${addon.price.toFixed(2)}` : ""}
															</Typography>
														</li>
													))}
												</Box>
											)}
										</Box>

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
								<>
									<Button
										onClick={() => handleStatusUpdate(order._id, "Preparing")}
										variant="outlined"
										color="success"
									>
										Accept
									</Button>
									<Button
										onClick={() => handleStatusUpdate(order._id, "Rejected")}
										variant="outlined"
										color="error"
									>
										Reject
									</Button>
								</>
							)}
							{order.status === "Preparing" && (
								<Button
									onClick={() => handleStatusUpdate(order._id, "Ready")}
									variant="outlined"
									color="warning"
								>
									Ready
								</Button>
							)}
							{order.status === "Ready" && (
								<Button
									variant="outlined"
									color="success"
									onClick={() => handleStatusUpdate(order._id, "Completed")}
									disabled={order.confirmedByAdmin} // Disable if already clicked
								>
									{order.confirmedByAdmin ? "Waiting for Member..." : "Complete"}
								</Button>
							)}
						</Stack>
					</Paper>
				))}
		</Container>
	);
}
