import React, { useState } from "react";
import {
	Box,
	Typography,
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Button,
} from "@mui/material";

const initialMenu = [
	{
		name: "Cappuccino",
		description: "Rich espresso with steamed milk and foam",
		price: 4.5,
		image: "https://source.unsplash.com/featured/?cappuccino",
		category: "Coffee",
	},
	{
		name: "Ham Croissant",
		description: "Freshly baked croissant with ham and cheese",
		price: 6.0,
		image: "https://source.unsplash.com/featured/?croissant",
		category: "Food",
	},
	{
		name: "Latte",
		description: "Creamy and smooth espresso-based drink",
		price: 4.8,
		image: "https://source.unsplash.com/featured/?latte",
		category: "Coffee",
	},
];

export default function MenuListPage() {
	const [menuItems, setMenuItems] = useState(initialMenu);

	const handleDelete = (name) => {
		setMenuItems((prev) => prev.filter((item) => item.name !== name));
	};

	const handleEdit = (item) => {
		alert(`Edit not implemented yet for "${item.name}"`);
	};

	const groupedMenu = menuItems.reduce((acc, item) => {
		acc[item.category] = acc[item.category] || [];
		acc[item.category].push(item);
		return acc;
	}, {});

	return (
		<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
			<Container>
				<Typography
					variant="h4"
					fontWeight="bold"
					color="#435A12"
					textAlign="center"
					mb={4}
				>
					Your Menu
				</Typography>

				{Object.entries(groupedMenu).map(([category, items], idx) => (
					<Box key={idx} sx={{ mb: 5 }}>
						<Typography variant="h5" fontWeight="bold" color="#5E6F1A" mb={2}>
							{category}
						</Typography>
						<Grid container spacing={3}>
							{items.map((item, i) => (
								<Grid item xs={12} sm={6} md={4} key={i}>
									<Card sx={{ borderRadius: 3 }}>
										<CardMedia
											component="img"
											height="160"
											image={item.image}
											alt={item.name}
										/>
										<CardContent>
											<Typography variant="h6" fontWeight="bold">
												{item.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{item.description}
											</Typography>
											<Typography variant="body1" fontWeight="bold" mt={1}>
												${item.price.toFixed(2)}
											</Typography>
										</CardContent>
										<CardActions sx={{ px: 2, pb: 2 }}>
											<Button
												variant="outlined"
												size="small"
												sx={{ color: "#435A12", borderColor: "#7E8E20" }}
												onClick={() => handleEdit(item)}
											>
												Edit
											</Button>
											<Button
												variant="contained"
												size="small"
												sx={{
													backgroundColor: "#7E8E20",
													color: "#fff",
													ml: 1,
													"&:hover": { backgroundColor: "#5E6F1A" },
												}}
												onClick={() => handleDelete(item.name)}
											>
												Delete
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				))}
			</Container>
		</Box>
	);
}
