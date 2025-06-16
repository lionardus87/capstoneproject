import React, { useState } from "react";
import { Box, Grid, Typography, Link, Stack, Container } from "@mui/material";
import SignupModal from "./SignupModal";

export default function Footer() {
	const [signup, setSignup] = useState(false);
	const handleSignup = async (formData) => {
		console.log("Signup submitted from footer:", formData);
		// Simulate success response
		return { success: true };
	};

	return (
		<>
			<Box
				component="footer"
				sx={{
					width: "100%",
					backgroundColor: "#435A12", // Army Green
					color: "#DCE5D2", // White Coffee
					py: 6,
				}}
			>
				<Container maxWidth="lg">
					<Grid container spacing={12} justifyContent={"center"}>
						{/* Quick Links */}
						<Grid item xs={12} md={4}>
							<Typography
								variant="h6"
								gutterbottom="true"
								sx={{ color: "#B6CA93", fontFamily: "inherit" }}
							>
								Quick Links
							</Typography>
							<Stack spacing={1}>
								<Link href="/about" underline="hover" color="#DCE5D2">
									About Us
								</Link>
								<Link href="/contact" underline="hover" color="#DCE5D2">
									Contact Us
								</Link>
								<Link onClick={() => setSignup(true)} underline="hover" color="#DCE5D2">
									Join Us
								</Link>
							</Stack>
						</Grid>

						{/* Products */}
						<Grid item xs={12} md={4}>
							<Typography
								variant="h6"
								gutterbottom="true"
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
						<Grid item xs={12} md={4}>
							<Typography
								variant="h6"
								gutterbottom="true"
								sx={{ color: "#B6CA93", fontFamily: "inherit" }}
							>
								Contact
							</Typography>
							<Stack spacing={0.5}>
								<Typography variant="body2">
									123 Coffee Lane, Sydney, NSW 2000
								</Typography>
								<Typography variant="body2">Email: support@coffeeque.com.au</Typography>
								<Typography variant="body2">Phone: +61 2 1234 5678</Typography>
							</Stack>
						</Grid>
					</Grid>

					<Typography
						variant="body2"
						align="center"
						sx={{ mt: 6, color: "#B6CA93" }}
					>
						© {new Date().getFullYear()} CoffeeQue. All rights reserved.
					</Typography>
				</Container>
			</Box>
			{/* Signup Modal */}
			<SignupModal
				open={signup}
				onClose={() => setSignup(false)}
				onSave={handleSignup}
			/>
		</>
	);
}
