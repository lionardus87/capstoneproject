import React, { useState, useMemo } from "react";
import {
	Box,
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CircularProgress,
	TextField,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../contexts/VenuesContext";

export default function VenuesListPage() {
	const navigate = useNavigate();
	const { venues, isLoading, error } = useVenues();

	const [searchTerm, setSearchTerm] = useState("");
	const [cityFilter, setCityFilter] = useState("All");

	// Get unique cities
	const cityOptions = useMemo(() => {
		const cities = venues.map((v) => v.city).filter(Boolean);
		return ["All", ...Array.from(new Set(cities))];
	}, [venues]);

	// Filtered venues
	const filteredVenues = useMemo(() => {
		return venues.filter((venue) => {
			const lowerSearch = searchTerm.toLowerCase();
			const matchesSearch =
				venue.venueName.toLowerCase().includes(lowerSearch) ||
				venue.postcode?.toString().toLowerCase().includes(lowerSearch) ||
				venue.city?.toLowerCase().includes(lowerSearch);
			const matchesCity = cityFilter === "All" || venue.city === cityFilter;
			return matchesSearch && matchesCity;
		});
	}, [venues, searchTerm, cityFilter]);

	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Typography color="error" textAlign="center" mt={4}>
				{error}
			</Typography>
		);
	}

	return (
		<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh", py: 6 }}>
			<Container>
				<Typography
					variant="h4"
					fontWeight="bold"
					textAlign="center"
					mb={4}
					color="#3E4C2C"
				>
					Explore Venues
				</Typography>

				{/* Filter Buttons */}
				<Box sx={{ mb: 2, textAlign: "center" }}>
					{cityOptions.map((city) => (
						<Button
							key={city}
							variant={cityFilter === city ? "contained" : "outlined"}
							onClick={() => setCityFilter(city)}
							sx={{
								mx: 0.5,
								mb: 1,
								textTransform: "capitalize",
								color: cityFilter === city ? "common.white" : "text.primary",
							}}
						>
							{city}
						</Button>
					))}
				</Box>

				{/* Search Bar */}
				<Box sx={{ mb: 4 }}>
					<TextField
						label="Search venues"
						variant="outlined"
						fullWidth
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</Box>

				{/* Venue Cards */}
				{filteredVenues.length === 0 ? (
					<Typography textAlign="center" color="text.secondary" mt={4}>
						No venues found.
					</Typography>
				) : (
					<Grid container spacing={4}>
						{filteredVenues.map((venue) => (
							<Grid item xs={12} sm={6} md={4} key={venue._id}>
								<Card
									sx={{
										cursor: "pointer",
										borderRadius: 3,
										transition: "0.3s",
										"&:hover": {
											boxShadow: 6,
											transform: "scale(1.02)",
										},
									}}
									onClick={() => navigate(`/venues/${venue._id}/products`)}
								>
									<CardMedia
										component="img"
										height="180"
										image={
											venue.logoUrl?.trim() ? venue.logoUrl : "/venue-placeholder.jpg"
										}
										alt={venue.venueName}
									/>
									<CardContent>
										<Typography variant="h6" fontWeight="bold" gutterBottom>
											{venue.venueName}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											📍 {venue.city}, {venue.postcode}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				)}
			</Container>
		</Box>
	);
}
