import React, { useState, useContext } from "react";
import { Box, Grid, Typography, Link, Stack, Container } from "@mui/material";
import SignupModal from "./modals/SignupModal";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Footer() {
	const [signup, setSignup] = useState(false);
	const { auth } = useContext(AuthContext);

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
						<Grid>
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
								{auth.isLogin && auth.user.role === "member" && (
									<Link
										component={RouterLink}
										to="/register-venue"
										underline="hover"
										color="#DCE5D2"
									>
										Register my venue
									</Link>
								)}
							</Stack>
						</Grid>

						{/* Products */}
						<Grid>
							<Typography
								variant="h6"
								gutterbottom="true"
								sx={{ color: "#B6CA93", fontFamily: "inherit" }}
							>
								Products
							</Typography>
							<Stack spacing={1}>
								<Link
									href="/venues/:venueId/products"
									underline="hover"
									color="#DCE5D2"
								>
									Products
								</Link>
								<Link href="/venues" underline="hover" color="#DCE5D2">
									Venues
								</Link>
							</Stack>
						</Grid>

						{/* Contact Info */}
						<Grid>
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
			<SignupModal open={signup} onClose={() => setSignup(false)} />
		</>
	);
}
