import React from "react";
import {
	Box,
	Container,
	Typography,
	Grid,
	Divider,
	Paper,
} from "@mui/material";

import missionImg from "../assets/Mission.jpeg"; // Replace with actual image paths
import visionImg from "../assets/Vision.jpeg";
import aboutBg from "../assets/AboutUs.jpg"; // Background image for About section

export default function AboutPage() {
	return (
		<Box
			sx={{ backgroundColor: "background.default", minHeight: "100vh", pb: 12 }}
		>
			{/* About Section with Background Image */}
			<Box
				sx={{
					position: "relative",
					color: "#fff",
					py: { xs: 10, md: 14 },
					mb: 8,
					backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${aboutBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h1"
						fontWeight="bold"
						sx={{ fontFamily: "'Playfair Display', serif", mb: 3 }}
					>
						About CoffeeQue
					</Typography>
					<Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
						CoffeeQue was born from the hustle of daily commutes and the love of a
						perfectly brewed cup. We believe no one should have to choose between
						great coffee and their time.
					</Typography>
					<Typography variant="body1" sx={{ lineHeight: 1.8 }}>
						With CoffeeQue, you can skip the line, order in advance, and have your
						drink waiting — piping hot and just the way you like it.
					</Typography>
				</Container>
			</Box>

			<Container maxWidth="lg">
				{/* Mission Section */}
				<Grid
					container
					spacing={4}
					alignItems="center"
					sx={{ mb: 10, px: { xs: 2, md: 4 } }}
				>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Typography
							variant="h4"
							fontWeight="bold"
							color="primary.main"
							sx={{ mb: 3 }}
						>
							Our Mission
						</Typography>
						<Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
							To serve premium, sustainably sourced coffee and handcrafted food while
							fostering connection and community in every cup.
						</Typography>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 5 }}>
						<Box
							component="img"
							src={missionImg}
							alt="Our Mission"
							sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
						/>
					</Grid>
				</Grid>

				{/* Vision Section */}
				<Grid
					container
					spacing={4}
					alignItems="center"
					sx={{
						mb: 10,

						px: { xs: 2, md: 4 },
					}}
				>
					<Grid size={{ xs: 12, sm: 6, md: 5 }}>
						<Box
							component="img"
							src={visionImg}
							alt="Our Vision"
							sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<Typography
							variant="h4"
							fontWeight="bold"
							color="primary.main"
							sx={{ mb: 3 }}
						>
							Our Vision
						</Typography>
						<Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
							To become a beloved local brand known for quality, sustainability, and a
							heartwarming coffeehouse experience.
						</Typography>
					</Grid>
				</Grid>

				<Divider sx={{ mb: 8 }} />

				{/* Core Values */}
				<Box sx={{ textAlign: "center" }}>
					<Typography
						variant="h4"
						color="primary.main"
						fontWeight="bold"
						sx={{ mb: 4, fontFamily: "'Playfair Display', serif" }}
					>
						Our Core Values
					</Typography>

					<Grid container spacing={4} justifyContent="center">
						{[
							{
								title: "Quality",
								desc:
									"We never compromise on the taste or sourcing of our ingredients.",
							},
							{
								title: "Community",
								desc: "We are a space for connection, creativity, and comfort.",
							},
							{
								title: "Sustainability",
								desc:
									"From bean to cup, we prioritize ethical and eco-friendly practices.",
							},
						].map(({ title, desc }) => (
							<Grid key={title} size={{ xs: 6, sm: 6, md: 4 }} sx={{ height: "100%" }}>
								<Paper
									elevation={3}
									sx={{
										p: 3,
										borderRadius: 3,
										height: "100%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									}}
								>
									<Typography
										variant="h6"
										fontWeight="bold"
										color="secondary.main"
										sx={{ mb: 1 }}
									>
										{title}
									</Typography>
									<Typography variant="body2" color="text.primary">
										{desc}
									</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Box>
	);
}
