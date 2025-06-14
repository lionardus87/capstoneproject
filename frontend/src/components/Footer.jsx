import React from "react";
import { Box, Grid, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				width: "100%",
				backgroundColor: "#435A12", // Army Green
				color: "#DCE5D2", // White Coffee
				paddingY: 6,
				paddingX: { xs: 4, md: 10 },
			}}
		>
			<Grid container spacing={5}>
				{/* About Us */}
				<Grid item xs={12} md={3}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ color: "#B6CA93", fontFamily: "inherit" }}
					>
						About Us
					</Typography>
					<Typography variant="body2">
						CoffeeQue helps you order your coffee and food ahead of time — skip the
						line, save your time, and enjoy more moments.
					</Typography>
				</Grid>

				{/* Quick Links */}
				<Grid item xs={12} md={3}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ color: "#B6CA93", fontFamily: "inherit" }}
					>
						Quick Links
					</Typography>
					<Stack spacing={1}>
						<Link href="#about" underline="hover" color="#DCE5D2">
							About Us
						</Link>
						<Link href="#contact" underline="hover" color="#DCE5D2">
							Contact Us
						</Link>
					</Stack>
				</Grid>

				{/* Products */}
				<Grid item xs={12} md={3}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ color: "#B6CA93", fontFamily: "inherit" }}
					>
						Products
					</Typography>
					<Stack spacing={1}>
						<Link href="#coffee" underline="hover" color="#DCE5D2">
							Coffee
						</Link>
						<Link href="#food" underline="hover" color="#DCE5D2">
							Food
						</Link>
					</Stack>
				</Grid>

				{/* Contact Info */}
				<Grid item xs={12} md={3}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ color: "#B6CA93", fontFamily: "inherit" }}
					>
						Contact
					</Typography>
					<Typography variant="body2">123 Coffee Lane, Sydney, NSW 2000</Typography>
					<Typography variant="body2">Email: support@coffeeque.com.au</Typography>
					<Typography variant="body2">Phone: +61 2 1234 5678</Typography>
				</Grid>
			</Grid>

			<Typography variant="body2" align="center" sx={{ mt: 6, color: "#B6CA93" }}>
				© {new Date().getFullYear()} CoffeeQue. All rights reserved.
			</Typography>
		</Box>
	);
}
