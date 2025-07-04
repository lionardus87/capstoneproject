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
			<Typography variant="h4" mb={4} fontWeight="bold" color="#435A12">
				Incoming Orders
			</Typography>

			{[...orders]
				.sort((a, b) => formatDateTime(b.createdAt) - formatDateTime(a.createdAt))
				.map((order) => (
					<Paper
						key={order._id}
						sx={{ mb: 4, p: 3, backgroundColor: "#DCE5D2", borderRadius: 3 }}
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
									<ListItem>
										<ListItemText primary={`${item.product.itemName} x${item.qty}`} />
										<Typography>${(item.product.price * item.qty).toFixed(2)}</Typography>
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
