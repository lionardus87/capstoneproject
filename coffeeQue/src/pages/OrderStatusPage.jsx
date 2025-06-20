import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Divider,
	Card,
	CardContent,
	CardMedia,
	Button,
	Snackbar,
	Alert,
	Grid,
} from "@mui/material";

export default function OrderStatusPage() {
	const orderStatus = [
		{ label: "Order Received", time: "10:00 AM" },
		{ label: "Accepted", time: "10:02 AM" },
		{ label: "In Preparation", time: "10:10 AM" },
		{ label: "Ready for Pickup", time: "10:25 AM" },
	];

	const menuItems = [
		{
			name: "Cappuccino",
			description: "Rich espresso with steamed milk and foam",
			image: "https://source.unsplash.com/featured/?cappuccino",
		},
		{
			name: "Ham Croissant",
			description: "Freshly baked croissant with ham and cheese",
			image: "https://source.unsplash.com/featured/?croissant",
		},
	];

	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleCancel = () => {
		setSnackbarOpen(true);
	};

	return (
		<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
			<Container maxWidth="sm">
				<Typography variant="h4" fontWeight="bold" color="#435A12" mb={4}>
					Order Status
				</Typography>

				{orderStatus.map((step, index) => (
					<Box key={index} mb={3}>
						<Typography variant="body1" fontWeight="bold">
							{step.label}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{step.time}
						</Typography>
						{index < orderStatus.length - 1 && <Divider sx={{ my: 2 }} />}
					</Box>
				))}

				<Typography variant="h5" fontWeight="bold" color="#435A12" mt={6} mb={2}>
					Your Items
				</Typography>
				<Grid container spacing={3}>
					{menuItems.map((item, i) => (
						<Grid item xs={12} key={i}>
							<Card sx={{ display: "flex", borderRadius: 3 }}>
								<CardMedia
									component="img"
									sx={{ width: 120 }}
									image={item.image}
									alt={item.name}
								/>
								<CardContent sx={{ flex: 1 }}>
									<Typography variant="h6" fontWeight="bold">
										{item.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{item.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				<Button
					variant="contained"
					color="error"
					fullWidth
					onClick={handleCancel}
					sx={{
						mt: 5,
						textTransform: "none",
						fontWeight: "bold",
						"&:hover": { backgroundColor: "#b71c1c" },
					}}
				>
					Cancel Order
				</Button>

				<Snackbar
					open={snackbarOpen}
					autoHideDuration={4000}
					onClose={() => setSnackbarOpen(false)}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						onClose={() => setSnackbarOpen(false)}
						severity="info"
						sx={{ width: "100%" }}
					>
						Order cannot be refunded after cancellation.
					</Alert>
				</Snackbar>
			</Container>
		</Box>
	);
}
