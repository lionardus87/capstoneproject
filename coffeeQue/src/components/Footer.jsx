import React, { useContext } from "react";
import { Box, Grid, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";
import logo from "../assets/CQ.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Footer() {
	const { auth } = useContext(AuthContext);
	const { openModal } = useModal();
	const isAdmin = auth?.user?.role === "admin";
	const isMember = auth?.user?.role === "member";

	return (
		<Box
			component="footer"
			sx={(theme) => ({
				width: "100%",
				bgcolor: theme.palette.primary.main,
				color: theme.palette.background.paper,
				py: 6,
			})}
		>
			<Box
				sx={{
					maxWidth: "100%",

					mx: "auto",
				}}
			>
				<Grid container spacing={5} justifyContent="center" px={15}>
					{/* About CoffeeQue */}
					<Grid size={{ xs: 12, sm: 5, md: 5, lg: 5 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
							<Box
								component="img"
								src={logo}
								alt="CoffeeQue Logo"
								sx={{ height: 24, borderRadius: 4 }}
							/>
							<Typography
								variant="h4"
								sx={{
									fontWeight: "bold",
									fontFamily: "'Playfair Display', serif",
									color: "secondary.main",
								}}
							>
								CoffeeQue
							</Typography>
						</Box>

						<Typography
							variant="body1"
							color="background.paper"
							sx={{ maxWidth: 300 }}
						>
							CoffeeQue helps you skip queues by letting you order coffee and food
							ahead from your favorite local venues, saving you time and hassle with
							real-time order tracking and easy pickup.
						</Typography>
					</Grid>

					{/* Quick Links */}
					<Grid size={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "secondary.main", fontFamily: "inherit" }}
						>
							Quick Links
						</Typography>
						<Stack spacing={1}>
							<Link
								component={RouterLink}
								to="/about"
								underline="hover"
								color="background.paper"
							>
								About Us
							</Link>
							<Link
								component={RouterLink}
								to="/contact"
								underline="hover"
								color="background.paper"
							>
								Contact Us
							</Link>
							<Link
								onClick={() => openModal("signup")}
								underline="hover"
								color="background.paper"
								sx={{ cursor: "pointer" }}
							>
								Join Us
							</Link>
							{!isAdmin && (
								<Link
									component={RouterLink}
									to="/venues"
									underline="hover"
									color="background.paper"
								>
									Venues
								</Link>
							)}
							{auth.isLogin && (isMember || isAdmin) && (
								<Link
									component={RouterLink}
									to="/review"
									underline="hover"
									color="background.paper"
								>
									Leave a Review
								</Link>
							)}
						</Stack>
					</Grid>

					{/* Contact Info */}
					<Grid size={{ xs: 6, sm: 4, md: 4 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "secondary.main", fontFamily: "inherit" }}
						>
							Contact
						</Typography>
						<Stack spacing={0.5} color="background.paper">
							<Box display="flex" alignItems="center" gap={1}>
								<LocationOnIcon fontSize="small" />
								<Typography variant="body2">
									123 Coffee Lane, Sydney, NSW 2000
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" gap={1}>
								<EmailIcon fontSize="small" />
								<Typography variant="body2">Email: support@coffeeque.com.au</Typography>
							</Box>
							<Box display="flex" alignItems="center" gap={1}>
								<PhoneIcon fontSize="small" />
								<Typography variant="body2">Phone: +61 2 1234 5678</Typography>
							</Box>
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
			</Box>
		</Box>
	);
}
