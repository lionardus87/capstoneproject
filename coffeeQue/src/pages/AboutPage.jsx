import React from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";

export default function AboutPage() {
	return (
		<Box sx={{ backgroundColor: "#F7F9F3", py: 8 }}>
			<Container maxWidth="md">
				<Typography
					variant="h3"
					align="center"
					gutterbottom
					sx={{ color: "#435A12", fontWeight: "bold" }}
				>
					About CoffeeQue
				</Typography>

				<Typography variant="body1" align="center" sx={{ mb: 6, color: "#333" }}>
					At CoffeeQue, we believe coffee is more than just a drink—it's a ritual, a
					culture, and a community. From ethically-sourced beans to
					thoughtfully-crafted food, we bring people together over quality and
					warmth.
				</Typography>

				<Divider sx={{ my: 4 }} />

				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Typography variant="h5" sx={{ color: "#7E8E20", fontWeight: "bold" }}>
							Our Mission
						</Typography>
						<Typography variant="body1" sx={{ mt: 1 }}>
							To serve premium, sustainably sourced coffee and handcrafted food while
							fostering connection and community in every cup.
						</Typography>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Typography variant="h5" sx={{ color: "#7E8E20", fontWeight: "bold" }}>
							Our Vision
						</Typography>
						<Typography variant="body1" sx={{ mt: 1 }}>
							To become a beloved local brand known for quality, sustainability, and a
							heartwarming coffeehouse experience.
						</Typography>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Typography
					variant="h5"
					sx={{ color: "#7E8E20", fontWeight: "bold", mb: 2 }}
				>
					Our Core Values
				</Typography>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							fontWeight="bold"
							sx={{ color: "#435A12" }}
						>
							Quality
						</Typography>
						<Typography variant="body2">
							We never compromise on the taste or sourcing of our ingredients.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							fontWeight="bold"
							sx={{ color: "#435A12" }}
						>
							Community
						</Typography>
						<Typography variant="body2">
							We are a space for connection, creativity, and comfort.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							fontWeight="bold"
							sx={{ color: "#435A12" }}
						>
							Sustainability
						</Typography>
						<Typography variant="body2">
							From bean to cup, we prioritize ethical and eco-friendly practices.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
