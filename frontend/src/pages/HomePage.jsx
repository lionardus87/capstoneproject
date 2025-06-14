import React from "react";
import {
	Box,
	Typography,
	Button,
	Stack,
	TextField,
	InputAdornment,
	Container,
	Grid,
	Card,
	CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const products = [
	{
		title: "Coffee",
		description:
			"Brewed fresh from your favorite cafés. Order ahead, skip the queue.",
		icon: <LocalCafeIcon sx={{ fontSize: 50, color: "#7E8E20" }} />,
	},
	{
		title: "Food",
		description:
			"Delicious meals and snacks for any time of day, ready when you are.",
		icon: <RestaurantIcon sx={{ fontSize: 50, color: "#7E8E20" }} />,
	},
];

const testimonials = [
	{
		quote:
			"…very good and super convenient… The menu system is really nicely laid out and user friendly.",
		name: "Wynn C.",
	},
	{
		quote:
			"Definitely beat the Q!! Ordered before break, coffee was ready to go. Perfect for rush time.",
		name: "Ramsey K.",
	},
	{
		quote:
			"Convenient, quick, no chance of misheard orders. Plan on the train or bus.",
		name: "Shelley S.",
	},
];

export default function HomePage() {
	return (
		<Box sx={{ bgcolor: "#F7F9F3" }}>
			{/* About Us */}
			<Box
				sx={{
					pt: 3,
					pb: 10,
					px: 2,
					backgroundColor: "#F7F9F3",
					textAlign: "center",
				}}
			>
				<Container maxWidth={false}>
					<Typography variant="h3" fontWeight="bold" gutterBottom color="#435A12">
						Skip the queue. Coffee at your fingertips.
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						maxWidth="sm"
						gutterBottom
						sx={{ mx: "auto" }}
					>
						Order ahead from your favourite local cafés and restaurants.
					</Typography>

					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						sx={{ mt: 4, justifyContent: "center", alignItems: "center" }}
					>
						<TextField
							variant="outlined"
							placeholder="Enter location or suburb"
							size="small"
							sx={{ width: { xs: "100%", sm: "300px" } }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								sx: { borderRadius: 5, backgroundColor: "#fff" },
							}}
						/>
						<Button
							variant="contained"
							sx={{
								borderRadius: 5,
								backgroundColor: "#7E8E20",
								px: 4,
								textTransform: "none",
								fontWeight: "bold",
								"&:hover": { backgroundColor: "#5E6F1A" },
							}}
						>
							Find Coffee
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* Hero Section */}
			<Box
				sx={{
					pt: 3,
					pb: 10,
					px: 2,
					backgroundColor: "#DCE5D2",
					textAlign: "center",
				}}
			>
				<Container maxWidth={false}>
					<Typography variant="h4" fontWeight="bold" gutterBottom color="#435A12">
						About CoffeeQue
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						maxWidth="sm"
						sx={{ mx: "auto" }}
					>
						CoffeeQue is your go-to app for skipping queues and ordering ahead at your
						favourite local cafés. We're passionate about connecting busy people with
						great coffee and food – fast, simple, and reliable.
					</Typography>
				</Container>
			</Box>

			{/* Products Section */}
			<Box
				sx={{
					pt: 3,
					pb: 10,
					px: 2,
					backgroundColor: "#F7F9F3",
					textAlign: "center",
				}}
			>
				<Container maxWidth={false}>
					<Typography variant="h4" fontWeight="bold" gutterBottom color="#435A12">
						Products
					</Typography>
					<Grid container spacing={4} justifyContent="center">
						{products.map((product, index) => (
							<Grid item xs={12} md={6} key={index}>
								<Card
									elevation={2}
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										textAlign: "center",
										p: 4,
										borderRadius: 4,
										height: "100%",
									}}
								>
									{product.icon}
									<Typography variant="h6" fontWeight="bold" mt={2} gutterBottom>
										{product.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{product.description}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Testimonials Section */}
			<Box
				sx={{
					backgroundColor: "#DCE5D2",
					pt: 3,
					pb: 10,
					px: 2,
					textAlign: "center",
				}}
			>
				<Container maxWidth={false}>
					<Typography variant="h4" fontWeight="bold" gutterBottom color="#435A12">
						What people are saying
					</Typography>
					<Grid container spacing={4} justifyContent="center" mt={2}>
						{testimonials.map((t, i) => (
							<Grid item xs={12} md={4} key={i}>
								<Card
									elevation={0}
									sx={{
										px: 3,
										py: 4,
										borderRadius: 3,
										height: "100%",
										backgroundColor: "#fff",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										textAlign: "center",
									}}
								>
									<Typography variant="body1" gutterBottom>
										“{t.quote}”
									</Typography>
									<Typography variant="subtitle2" fontWeight="bold" mt={2}>
										— {t.name}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</Box>
	);
}
