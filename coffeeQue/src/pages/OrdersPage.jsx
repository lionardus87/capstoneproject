import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	Button,
	Divider,
	Chip,
	Stack,
} from "@mui/material";

export default function OrderStatusPage({ isAdmin = false }) {
	const [orders, setOrders] = useState([
		{
			_id: "order1",
			venue: { venueName: "Central Cafe" },
			status: "Pending",
			products: [
				{
					product: { itemName: "Latte", price: 4.5 },
					qty: 1,
					addOns: [
						{ name: "Milk", value: "Oat" },
						{ name: "Sugar", value: "1" },
					],
				},
				{
					product: { itemName: "Muffin", price: 3.0 },
					qty: 2,
				},
			],
		},
		{
			_id: "order2",
			venue: { venueName: "Green Beans Cafe" },
			status: "Ready",
			products: [
				{
					product: { itemName: "Flat White", price: 4.0 },
					qty: 1,
				},
			],
		},
	]);

	const handleStatusUpdate = (orderId, newStatus) => {
		setOrders((prev) =>
			prev.map((order) =>
				order._id === orderId ? { ...order, status: newStatus } : order
			)
		);
	};

	if (orders.length === 0) {
		return (
			<Typography textAlign="center" mt={6} color="text.secondary">
				No orders found.
			</Typography>
		);
	}

	return (
		<Container sx={{ py: 6 }}>
			<Typography variant="h4" mb={4} fontWeight="bold" color="#435A12">
				{isAdmin ? "Incoming Orders" : "My Orders"}
			</Typography>

			{orders.map((order) => (
				<Paper
					key={order._id}
					sx={{ mb: 4, p: 3, backgroundColor: "#DCE5D2", borderRadius: 3 }}
					elevation={2}
				>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6">Venue: {order.venue.venueName}</Typography>
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
								<ListItem>
									<ListItemText
										primary={`${item.product.itemName} x${item.qty}`}
										secondary={
											item.addOns?.length
												? `Add-ons: ${item.addOns
														.map((a) => `${a.name}: ${a.value}`)
														.join(", ")}`
												: null
										}
									/>
									<Typography>${(item.product.price * item.qty).toFixed(2)}</Typography>
								</ListItem>
								<Divider component="li" />
							</React.Fragment>
						))}
					</List>

					<Box
						mt={2}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography fontWeight="bold">
							Total: $
							{order.products
								.reduce((sum, p) => sum + p.product.price * p.qty, 0)
								.toFixed(2)}
						</Typography>

						{/* Action Buttons */}
						<Stack direction="row" spacing={2}>
							{isAdmin ? (
								<>
									{order.status === "Pending" && (
										<>
											<Button
												variant="outlined"
												color="success"
												onClick={() => handleStatusUpdate(order._id, "Preparing")}
											>
												Accept
											</Button>
											<Button
												variant="outlined"
												color="error"
												onClick={() => handleStatusUpdate(order._id, "Rejected")}
											>
												Reject
											</Button>
										</>
									)}

									{order.status === "Preparing" && (
										<Button
											variant="outlined"
											color="warning"
											onClick={() => handleStatusUpdate(order._id, "Ready")}
										>
											Ready
										</Button>
									)}

									{order.status === "Ready" && (
										<Button
											variant="outlined"
											color="success"
											onClick={() => handleStatusUpdate(order._id, "Completed")}
										>
											Complete
										</Button>
									)}
								</>
							) : (
								<>
									{order.status === "Pending" && (
										<Button
											variant="outlined"
											color="error"
											onClick={() => handleStatusUpdate(order._id, "Cancelled")}
										>
											Cancel
										</Button>
									)}

									{order.status === "Ready" && (
										<Button
											variant="outlined"
											color="success"
											onClick={() => handleStatusUpdate(order._id, "Completed")}
										>
											Complete
										</Button>
									)}
								</>
							)}
						</Stack>
					</Box>
				</Paper>
			))}
		</Container>
	);
}
