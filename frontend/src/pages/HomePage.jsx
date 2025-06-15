import React, { useState } from "react";
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
	IconButton,
	Divider,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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
	const [index, setIndex] = useState(0);
	const visibleCount = 2;

	const maxIndex = Math.max(testimonials.length - visibleCount, 0);

	const handlePrev = () => {
		setIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setIndex((prev) => Math.min(prev + 1, maxIndex));
	};

	const visibleTestimonials = testimonials.slice(index, index + visibleCount);
	return (
		<Box sx={{ bgcolor: "#F7F9F3", fontFamily: "inherit" }}>
			{/* Hero Section with Coffee Image */}
			<Box
				sx={{
					px: 2,
					py: { xs: 6, md: 10 },
					textAlign: "center",
					backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: "#fff",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h2"
						fontWeight="bold"
						gutterbottom="true"
						sx={{ fontFamily: "'Playfair Display', serif" }}
					>
						Skip the Queue
					</Typography>
					<Typography variant="h5" fontWeight={300} gutterbottom="true">
						Coffee at your fingertips — order ahead, save time, enjoy more.
					</Typography>

					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						sx={{
							mt: 4,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Enter location"
							size="small"
							sx={{
								width: { xs: "100%", sm: "300px" },
								borderRadius: 2,
								bgcolor: "#fff",
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							variant="contained"
							sx={{
								borderRadius: 5,
								px: 4,
								textTransform: "none",
								fontWeight: "bold",
								backgroundColor: "#7E8E20",
								"&:hover": { backgroundColor: "#5E6F1A" },
							}}
						>
							Find Coffee
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* About Us */}
			<Box sx={{ py: 4, px: 2 }}>
				<Container maxWidth="md" sx={{ textAlign: "center" }}>
					<Typography
						variant="h4"
						fontWeight="bold"
						gutterbottom="true"
						color="#435A12"
						sx={{ fontFamily: "'Playfair Display', serif" }}
					>
						About CoffeeQue
					</Typography>
					<Typography variant="body1" color="text.secondary" paragraph>
						CoffeeQue was born from the hustle of daily commutes and the love of a
						perfectly brewed cup. We believe no one should have to choose between
						great coffee and their time. Our mission is to eliminate the wait, reduce
						the friction, and bring coffee-lovers closer to the cafés they love.
					</Typography>
					<Typography variant="body1" color="text.secondary">
						With CoffeeQue, you can skip the line, order in advance, and have your
						drink waiting for you — piping hot and just the way you like it. Whether
						you're heading to work or taking a break, we help you reclaim your time
						without compromising on quality.
					</Typography>
				</Container>
			</Box>
			<Divider sx={{ my: 4 }} />
			{/* Products Section */}
			<Box sx={{ py: 5, px: 2, textAlign: "center" }}>
				<Container maxWidth="md">
					<Typography
						variant="h4"
						fontWeight="bold"
						gutterbottom="true"
						color="#435A12"
						sx={{ fontFamily: "'Playfair Display', serif" }}
					>
						What We Offer
					</Typography>
					<Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
						{products.map((product, index) => (
							<Grid item xs={12} sm={6} key={index}>
								<Card
									elevation={3}
									sx={{
										p: 4,
										borderRadius: 4,
										textAlign: "center",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										bgcolor: "#DCE5D2",
									}}
								>
									{product.icon}
									<Typography variant="h6" fontWeight="bold" mt={2} gutterbottom="true">
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
			<Divider sx={{ my: 4 }} />
			{/* Testimonials Section */}
			<Box sx={{ pt: 3, pb: 10, px: 2, textAlign: "center" }}>
				<Container maxWidth={false}>
					<Typography
						variant="h4"
						fontWeight="bold"
						gutterbottom="true"
						color="#435A12"
						sx={{ fontFamily: "'Playfair Display', serif" }}
					>
						What people are saying
					</Typography>

					<Stack direction="row" alignItems="center" justifyContent="center" mt={4}>
						<IconButton onClick={handlePrev} disabled={index === 0}>
							<ArrowBackIos sx={{ color: "#435A12" }} />
						</IconButton>

						<Stack direction="row" spacing={4} justifyContent="center">
							{visibleTestimonials.map((t, i) => (
								<Card
									key={i}
									sx={{
										width: { xs: "80vw", sm: "300px" },
										px: 3,
										py: 4,
										borderRadius: 3,
										backgroundColor: "#DCE5D2",
										textAlign: "center",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										flexShrink: 0,
									}}
									elevation={0}
								>
									<Typography variant="body1" gutterbottom="true">
										“{t.quote}”
									</Typography>
									<Typography variant="subtitle2" fontWeight="bold" mt={2}>
										— {t.name}
									</Typography>
								</Card>
							))}
						</Stack>

						<IconButton onClick={handleNext} disabled={index === maxIndex}>
							<ArrowForwardIos sx={{ color: "#435A12" }} />
						</IconButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
