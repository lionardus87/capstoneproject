import React from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";

export default function AboutPage() {
	return (
		<Box sx={{ backgroundColor: "background.default", minHeight: "80vh" }}>
			<Container maxWidth="md">
				{/* About Us */}
				<Box sx={{ py: 4 }}>
					<Container maxWidth="md" sx={{ textAlign: "center" }}>
						<Typography
							variant="h4"
							fontWeight="bold"
							gutterbottom="true"
							color="text.secondary"
							sx={{ fontFamily: "'Playfair Display', serif", margin: 4 }}
						>
							About CoffeeQue
						</Typography>
						<Typography variant="body1">
							CoffeeQue was born from the hustle of daily commutes and the love of a
							perfectly brewed cup. We believe no one should have to choose between
							great coffee and their time. Our mission is to eliminate the wait, reduce
							the friction, and bring coffee-lovers closer to the cafés they love.
						</Typography>
						<Typography variant="body1">
							With CoffeeQue, you can skip the line, order in advance, and have your
							drink waiting for you — piping hot and just the way you like it. Whether
							you're heading to work or taking a break, we help you reclaim your time
							without compromising on quality.
						</Typography>
					</Container>
				</Box>
				<Divider sx={{ my: 4 }} />

				{/* Vision and Mission */}
				<Box sx={{ py: 2 }}>
					<Container maxWidth="md" sx={{ textAlign: "center" }}>
						<Typography
							variant="h5"
							sx={{ color: "text.secondary", fontWeight: "bold" }}
						>
							Our Mission
						</Typography>
						<Typography variant="body1" sx={{ mt: 2 }}>
							To serve premium, sustainably sourced coffee and handcrafted food while
							fostering connection and community in every cup.
						</Typography>

						<Typography
							variant="h5"
							sx={{ color: "text.secondary", fontWeight: "bold", mt: 3 }}
						>
							Our Vision
						</Typography>
						<Typography variant="body1" sx={{ mt: 2 }}>
							To become a beloved local brand known for quality, sustainability, and a
							heartwarming coffeehouse experience.
						</Typography>
					</Container>
				</Box>

				<Divider sx={{ my: 4 }} />

				{/* Core Values */}
				<Box sx={{ py: 2, paddingBottom: 4 }}>
					<Container maxWidth="md" sx={{ textAlign: "center" }}>
						<Typography
							variant="h5"
							sx={{ color: "text.secondary", fontWeight: "bold", mb: 2 }}
						>
							Our Core Values
						</Typography>

						<Grid container spacing={2}>
							<Grid size={4}>
								<Typography
									variant="subtitle1"
									fontWeight="bold"
									sx={{ color: "secondary.main" }}
								>
									Quality
								</Typography>
								<Typography variant="body2">
									We never compromise on the taste or sourcing of our ingredients.
								</Typography>
							</Grid>
							<Grid size={4}>
								<Typography
									variant="subtitle1"
									fontWeight="bold"
									sx={{ color: "secondary.main" }}
								>
									Community
								</Typography>
								<Typography variant="body2">
									We are a space for connection, creativity, and comfort.
								</Typography>
							</Grid>
							<Grid size={4}>
								<Typography
									variant="subtitle1"
									fontWeight="bold"
									sx={{ color: "secondary.main" }}
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
			</Container>
		</Box>
	);
}
