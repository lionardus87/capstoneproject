import React, { useContext } from "react";
import { Box, Grid, Typography, Link, Stack, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";

export default function Footer() {
	const { auth } = useContext(AuthContext);
	const { openModal } = useModal();

	return (
		<Box
			component="footer"
			sx={(theme) => ({
				width: "100%",
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.background.paper,
				py: 6,
			})}
		>
			<Container maxWidth="lg">
				<Grid container spacing={8} justifyContent="center">
					{/* Quick Links */}
					<Grid item xs={12} sm={4}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "secondary.main", fontFamily: "inherit" }}
						>
							Quick Links
						</Typography>
						<Stack spacing={1}>
							<Link href="/about" underline="hover" color="inherit">
								About Us
							</Link>
							<Link href="/contact" underline="hover" color="inherit">
								Contact Us
							</Link>
							<Link
								onClick={() => openModal("signup")}
								underline="hover"
								color="inherit"
								sx={{ cursor: "pointer" }}
							>
								Join Us
							</Link>
							{auth.isLogin &&
								(auth.user.role === "member" || auth.user.role === "admin") && (
									<Link
										component={RouterLink}
										to="/review"
										underline="hover"
										color="inherit"
									>
										Leave a Review
									</Link>
								)}
						</Stack>
					</Grid>

					{/* Products */}
					<Grid item xs={12} sm={4}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "secondary.main", fontFamily: "inherit" }}
						>
							Products
						</Typography>
						<Stack spacing={1}>
							<Link href="/venues" underline="hover" color="inherit">
								Venues
							</Link>
							<Link href="/products/drinks" underline="hover" color="inherit">
								Drinks
							</Link>
							<Link href="/products/foods" underline="hover" color="inherit">
								Foods
							</Link>
						</Stack>
					</Grid>

					{/* Contact Info */}
					<Grid item xs={12} sm={4}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "secondary.main", fontFamily: "inherit" }}
						>
							Contact
						</Typography>
						<Stack spacing={0.5} color="inherit">
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
					sx={{ mt: 6, color: "secondary.main" }}
				>
					© {new Date().getFullYear()} CoffeeQue. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
}
