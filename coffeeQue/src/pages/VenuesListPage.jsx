import React from "react";
import {
	Box,
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../contexts/VenuesContext";

export default function VenuesListPage() {
	const navigate = useNavigate();
	const { venues, isLoading, error } = useVenues();

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

				<Grid container spacing={4}>
					{venues.map((venue) => (
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
			</Container>
		</Box>
	);
}

// import React, { useEffect, useState } from "react";
// import {
// 	Box,
// 	Container,
// 	Grid,
// 	Card,
// 	CardContent,
// 	CardMedia,
// 	Typography,
// 	CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function VenuesListPage() {
// 	const [venues, setVenues] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState("");
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchVenues = async () => {
// 			try {
// 				const response = await axios.get("/venues"); // Public route
// 				setVenues(response.data);
// 			} catch (err) {
// 				setError(err?.response?.data?.message || "Failed to load venues");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchVenues();
// 	}, []);

// 	if (loading) {
// 		return (
// 			<Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
// 				<CircularProgress />
// 			</Box>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<Typography color="error" textAlign="center" mt={4}>
// 				{error}
// 			</Typography>
// 		);
// 	}

// 	return (
// 		<Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", py: 6 }}>
// 			<Container>
// 				<Typography
// 					variant="h4"
// 					fontWeight="bold"
// 					textAlign="center"
// 					mb={4}
// 					color="#3E4C2C"
// 				>
// 					Explore Venues
// 				</Typography>

// 				<Grid container spacing={4}>
// 					{venues.map((venue) => (
// 						<Grid item xs={12} sm={6} md={4} key={venue._id}>
// 							<Card
// 								sx={{ cursor: "pointer", borderRadius: 3 }}
// 								onClick={() => navigate(`/venues/${venue._id}/products`)}
// 							>
// 								<CardMedia
// 									component="img"
// 									height="180"
// 									image={venue.logoUrl || "/venue-placeholder.jpg"}
// 									alt={venue.venueName}
// 								/>
// 								<CardContent>
// 									<Typography variant="h6" fontWeight="bold">
// 										{venue.venueName}
// 									</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										{venue.city}, {venue.postcode}
// 									</Typography>
// 								</CardContent>
// 							</Card>
// 						</Grid>
// 					))}
// 				</Grid>
// 			</Container>
// 		</Box>
// 	);
// }
