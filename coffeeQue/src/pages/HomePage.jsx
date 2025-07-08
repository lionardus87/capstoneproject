import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	Stack,
	Container,
	Grid,
	Card,
	IconButton,
	Divider,
	CircularProgress,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	ArrowBackIos,
	ArrowForwardIos,
	LocalCafe as LocalCafeIcon,
	Restaurant as RestaurantIcon,
} from "@mui/icons-material";
import { getTestimonials } from "../API/reviewAPI";
import { useNavigate } from "react-router";

const productFeatures = [
	{
		title: "Coffee",
		description:
			"Brewed fresh from your favorite cafés. Order ahead, skip the queue.",
		icon: <LocalCafeIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
	},
	{
		title: "Food",
		description:
			"Delicious meals and snacks for any time of day, ready when you are.",
		icon: <RestaurantIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
	},
];

export default function HomePage() {
	const [testimonials, setTestimonials] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		const loadTestimonials = async () => {
			try {
				const data = await getTestimonials();
				setTestimonials(data.reverse()); // Show latest first
			} catch (err) {
				console.error("Failed to load testimonials", err);
			} finally {
				setLoading(false);
			}
		};
		loadTestimonials();
	}, []);

	const visibleCount = 2;

	const handleNext = () => {
		setIndex((prev) => (prev + 1) % testimonials.length);
	};

	const handlePrev = () => {
		setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const visibleTestimonials = [];
	if (testimonials.length <= visibleCount) {
		visibleTestimonials.push(...testimonials);
	} else {
		for (let i = 0; i < visibleCount; i++) {
			visibleTestimonials.push(testimonials[(index + i) % testimonials.length]);
		}
	}

	return (
		<Box sx={{ bgcolor: "background.default", fontFamily: "inherit" }}>
			{/* Hero */}
			<Box
				sx={{
					px: 2,
					py: { xs: 8, md: 14 },
					textAlign: "center",
					backgroundImage: `url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80")`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: "#fff",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h2"
						fontWeight="bold"
						sx={{
							fontFamily: "'Playfair Display', serif",
							textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
						}}
					>
						Skip the Queue
					</Typography>
					<Typography
						variant="h5"
						fontWeight={300}
						mt={2}
						sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.4)" }}
					>
						Order coffee & food ahead from your favorite local venues.
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						onClick={() => navigate("/venues")}
						sx={{
							mt: 5,
							borderRadius: 6,
							px: 5,
							py: 1.5,
							fontSize: "1.1rem",
							fontWeight: "bold",
							textTransform: "none",
							boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
						}}
					>
						Order Now
					</Button>
				</Container>
			</Box>

			{/* What We Offer */}
			<Box
				sx={{
					py: 8,
					px: 2,
					textAlign: "center",
					backgroundColor: "background.default",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h4"
						fontWeight="bold"
						color="primary.main"
						sx={{ fontFamily: "'Playfair Display', serif", mb: 3 }}
					>
						What We Offer
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ mb: 5, maxWidth: 600, mx: "auto" }}
					>
						From a perfect morning brew to a hearty lunch, our platform helps you
						order ahead from the best local spots — fast, fresh, and frustration-free.
					</Typography>
					<Grid container spacing={4}>
						{productFeatures.map((item, i) => (
							<Grid key={i} item xs={12} sm={6}>
								<Card
									sx={{
										p: 4,
										borderRadius: 4,
										textAlign: "center",
										bgcolor: "background.paper",
										boxShadow: 2,
										minHeight: "200px",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{item.icon}
									<Typography variant="h6" fontWeight="bold" mt={2}>
										{item.title}
									</Typography>
									<Typography variant="body2" color="text.secondary" mt={1}>
										{item.description}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Testimonials */}
			<Box
				sx={{
					pt: 10,
					pb: 10,
					px: 2,
					backgroundColor: "background.default",
					textAlign: "center",
				}}
			>
				<Container maxWidth="lg">
					<Typography
						variant="h4"
						fontWeight="bold"
						color="primary.main"
						sx={{ fontFamily: "'Playfair Display', serif", mb: 4 }}
					>
						What people are saying
					</Typography>

					{loading ? (
						<Stack alignItems="center" mt={4}>
							<CircularProgress color="secondary" />
						</Stack>
					) : testimonials.length === 0 ? (
						<Typography mt={4} color="text.secondary">
							No testimonials yet.
						</Typography>
					) : (
						<Box sx={{ position: "relative", width: "100%" }}>
							<IconButton
								onClick={handlePrev}
								sx={{
									position: "absolute",
									left: isMobile ? "calc(50% - 80px)" : 0,
									top: "50%",
									transform: "translateY(-50%)",
									zIndex: 1,
								}}
							>
								<ArrowBackIos sx={{ color: "primary.main" }} />
							</IconButton>

							{isMobile ? (
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										px: 4,
										py: 2,
									}}
								>
									<Card
										sx={{
											width: "100%",
											maxWidth: 320,
											px: 3,
											py: 4,
											borderRadius: 3,
											backgroundColor: "background.paper",
											textAlign: "center",
											boxShadow: 2,
										}}
									>
										<Typography variant="body1" fontStyle="italic">
											“{testimonials[index].message}”
										</Typography>
										{testimonials[index].rating && (
											<Box mt={1}>
												<Typography variant="body2" color="secondary.main">
													{"★".repeat(testimonials[index].rating)}
													{"☆".repeat(5 - testimonials[index].rating)}
												</Typography>
											</Box>
										)}
										<Typography variant="subtitle2" fontWeight="bold" mt={2}>
											— {testimonials[index].user?.username || "Anonymous"}
										</Typography>
									</Card>
								</Box>
							) : (
								<Box
									sx={{
										display: "flex",
										overflowX: "auto",
										scrollSnapType: "x mandatory",
										scrollBehavior: "smooth",
										gap: 3,
										px: 1,
										py: 2,
										"&::-webkit-scrollbar": { display: "none" },
										scrollbarWidth: "none",
										msOverflowStyle: "none",
										justifyContent: { xs: "flex-start", md: "center" },
									}}
								>
									{visibleTestimonials.map((t, i) => (
										<Card
											key={i}
											sx={{
												width: { xs: "85vw", sm: 300 },
												minWidth: { xs: "85vw", sm: 300 },
												px: 3,
												py: 4,
												borderRadius: 3,
												backgroundColor: "background.paper",
												textAlign: "center",
												flexShrink: 0,
												scrollSnapAlign: { xs: "start", sm: "center" },
												boxShadow: 2,
											}}
										>
											<Typography variant="body1" fontStyle="italic">
												“{t.message}”
											</Typography>
											{t.rating && (
												<Box mt={1}>
													<Typography variant="body2" color="secondary.main">
														{[...Array(5)]
															.map((_, i) => (i < Number(t.rating) ? "★" : "☆"))
															.join("")}
													</Typography>
												</Box>
											)}
											<Typography variant="subtitle2" fontWeight="bold" mt={2}>
												— {t.user?.username || "Anonymous"}
											</Typography>
										</Card>
									))}
								</Box>
							)}

							<IconButton
								onClick={handleNext}
								sx={{
									position: "absolute",
									right: isMobile ? "calc(50% - 80px)" : 0,
									top: "50%",
									transform: "translateY(-50%)",
									zIndex: 1,
								}}
							>
								<ArrowForwardIos sx={{ color: "primary.main" }} />
							</IconButton>
						</Box>
					)}
				</Container>
			</Box>
		</Box>
	);
}
