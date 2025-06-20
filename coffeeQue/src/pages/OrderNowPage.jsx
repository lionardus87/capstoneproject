import React, { useState } from "react";
import {
	Box,
	Container,
	TextField,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";

const sampleVenues = [
	{
		name: "Cafe Aroma",
		location: "Sydney",
		postcode: "2000",
		category: ["Coffee"],
		image: "https://source.unsplash.com/featured/?cafe",
	},
	{
		name: "Bites & Brews",
		location: "Melbourne",
		postcode: "3000",
		category: ["Food", "Coffee"],
		image: "https://source.unsplash.com/featured/?restaurant",
	},
	{
		name: "The Lunch Box",
		location: "Brisbane",
		postcode: "4000",
		category: ["Food"],
		image: "https://source.unsplash.com/featured/?lunch",
	},
];

export default function OrderNowPage() {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");

	const filteredVenues = sampleVenues.filter((venue) => {
		const matchesSearch =
			venue.name.toLowerCase().includes(search.toLowerCase()) ||
			venue.location.toLowerCase().includes(search.toLowerCase()) ||
			venue.postcode.includes(search);
		const matchesCategory = filter ? venue.category.includes(filter) : true;
		return matchesSearch && matchesCategory;
	});

	return (
		<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
			<Container>
				<Typography variant="h4" fontWeight="bold" color="#435A12" mb={4}>
					Order from Venues
				</Typography>

				<Grid container spacing={2} mb={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							variant="outlined"
							label="Search by name, location or postcode"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={filter}
								label="Category"
								onChange={(e) => setFilter(e.target.value)}
							>
								<MenuItem value="">All</MenuItem>
								<MenuItem value="Coffee">Coffee</MenuItem>
								<MenuItem value="Food">Food</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={3}>
					{filteredVenues.map((venue, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card sx={{ borderRadius: 3 }}>
								<CardMedia
									component="img"
									height="160"
									image={venue.image}
									alt={venue.name}
								/>
								<CardContent>
									<Typography variant="h6" fontWeight="bold">
										{venue.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{venue.location} ({venue.postcode})
									</Typography>
									<Typography variant="body2" color="text.secondary" mt={1}>
										Categories: {venue.category.join(", ")}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
