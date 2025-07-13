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
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { getTestimonials } from "../API/reviewAPI";
import { useNavigate } from "react-router";

const FeatureCard = ({ img, title, desc }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				borderRadius: theme.shape.borderRadius,
				overflow: "hidden",
				boxShadow: theme.shadows[3],
				height: 250,
				bgcolor: "background.paper",
			}}
		>
			<Box
				component="img"
				src={img}
				alt={title}
				sx={{
					width: "100%",
					height: "70%",
					objectFit: "cover",
					flexShrink: 0,
				}}
			/>
			<Box
				sx={{
					p: 2,
					height: "30%",
					background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
					color: theme.palette.common.white,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Typography variant="h6" fontWeight="bold" mb={0.5}>
					{title}
				</Typography>
				<Typography variant="body2" sx={{ opacity: 0.9 }}>
					{desc}
				</Typography>
			</Box>
		</Box>
	);
};

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

	const visibleCount = 3;

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
		<Box sx={{ bgcolor: "background.default" }}>
			{/* Hero */}
			<Box
				sx={{
					px: 2,
					py: { xs: 8, md: 14 },
					textAlign: "center",
					backgroundImage:
						'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80")',
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: theme.palette.common.white,
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h1"
						fontWeight="bold"
						sx={{
							textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
						}}
					>
						Skip the Queue
					</Typography>
					<Typography
						variant="h4"
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
							mt: theme.spacing(5),
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
					bgcolor: "background.default",
				}}
			>
				<Container maxWidth="xl">
					<Typography variant="h4" color="text.secondary" sx={{ mb: 3 }}>
						What We Offer
					</Typography>
					<Typography
						variant="body1"
						color="text.primary"
						sx={{ mb: 5, maxWidth: 700, mx: "auto" }}
					>
						CoffeeQue lets you skip the queue, order ahead, and enjoy your favorite
						food and drinks from local cafés — with real-time tracking and seamless
						pickup.
					</Typography>

					<Box sx={{ maxWidth: 1200, mx: "auto" }}>
						<Grid container spacing={1} justifyContent="center">
							{/* Coffee */}
							<Grid size={{ xs: 12, sm: 6, md: 3 }}>
								<FeatureCard
									img="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
									title="Coffee"
									desc="Freshly brewed from your favorite cafés. Skip the queue."
								/>
							</Grid>

							{/* Food */}
							<Grid size={{ xs: 12, sm: 6, md: 3 }}>
								<FeatureCard
									img="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
									title="Food"
									desc="Hearty meals and snacks, ready when you are."
								/>
							</Grid>

							{/* Order Ahead */}
							<Grid size={{ xs: 12, sm: 6, md: 3 }}>
								<FeatureCard
									img="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80"
									title="Order Ahead"
									desc="Place orders before arrival. Minimize wait time and stress."
								/>
							</Grid>

							{/* Track Orders */}
							<Grid size={{ xs: 12, sm: 6, md: 3 }}>
								<FeatureCard
									img="https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80"
									title="Track Orders"
									desc="Stay updated with real-time order progress and pickup status."
								/>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Testimonials */}
			<Box
				sx={{
					pt: 5,
					pb: 10,
					px: 2,
					backgroundColor: "background.default",
					textAlign: "center",
				}}
			>
				<Container maxWidth="lg">
					<Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
						What people are saying
					</Typography>

					{loading ? (
						<Stack alignItems="center" mt={4}>
							<CircularProgress color="secondary" />
						</Stack>
					) : testimonials.length === 0 ? (
						<Typography mt={4} color="text.primary">
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
											borderRadius: theme.shape.borderRadius,
											backgroundColor: "background.paper",
											textAlign: "center",
											boxShadow: theme.shadows[2],
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
												borderRadius: theme.shape.borderRadius,
												backgroundColor: "background.paper",
												textAlign: "center",
												flexShrink: 0,
												scrollSnapAlign: { xs: "start", sm: "center" },
												boxShadow: theme.shadows[2],
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
