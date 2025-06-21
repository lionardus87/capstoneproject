import React, { useState } from "react";
import {
	Box,
	TextField,
	Stack,
	Button,
	Typography,
	Container,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Snackbar,
	Alert,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useSnackbar from "../hooks/useSnackbar";
import { registerVenue } from "../API/authAPI";

const steps = [
	{
		label: "Order Received",
		icon: <ShoppingBagIcon sx={{ color: "#7E8E20", fontSize: 40 }} />,
	},
	{
		label: "Prepare Order",
		icon: <RestaurantIcon sx={{ color: "#7E8E20", fontSize: 40 }} />,
	},
	{
		label: "Customer Pickup",
		icon: <DirectionsWalkIcon sx={{ color: "#7E8E20", fontSize: 40 }} />,
	},
	{
		label: "Order Done",
		icon: <CheckCircleIcon sx={{ color: "#7E8E20", fontSize: 40 }} />,
	},
];

export default function RegisterVenuePage() {
	const [formData, setFormData] = useState({
		venueName: "",
		city: "",
		postcode: "",
		logoUrl: "",
	});
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		const missingFields = ["venueName", "city", "postcode", "logoUrl"].filter(
			(field) => typeof formData[field] !== "string" || !formData[field].trim()
		);
		if (missingFields.length > 0) {
			showSnackbar(`${missingFields.join(", ")} field(s) are missing`, "error");
			return;
		}

		try {
			const { venueName, city, postcode, logoUrl } = formData;
			const result = await registerVenue({
				venueName,
				city,
				postcode,
				logoUrl,
			});
			if (result?.success) {
				showSnackbar("Registration successful!", "success");
				setFormData({
					venueName: "",
					city: "",
					postcode: "",
					logoUrl: "",
				});
			} else {
				showSnackbar("Registration failed.", "error");
			}
		} catch (error) {
			showSnackbar(
				"Registration failed: " + (error?.message || "Server error"),
				"error"
			);
		}
	};

	return (
		<>
			<Box sx={{ bgcolor: "#F7F9F3", minHeight: "100vh" }}>
				{/* Hero Background Section */}
				<Box
					sx={{
						px: 2,
						py: { xs: 6, md: 8 },
						textAlign: "center",
						backgroundImage: `url('https://m.media-amazon.com/images/I/81PdBK+WaWL.jpg')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						color: "#fff",
					}}
				>
					<Container maxWidth="md">
						<Typography
							variant="h3"
							fontWeight="bold"
							sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
						>
							Partner with CoffeeQue
						</Typography>
						<Typography variant="h6">
							Register your venue to serve more customers, faster.
						</Typography>
					</Container>
				</Box>

				<Container maxWidth="sm" sx={{ pb: 5 }}>
					{/* Register Form */}
					<Paper
						elevation={3}
						sx={{ p: 4, borderRadius: 3, bgcolor: "#fff", mt: 6 }}
					>
						<Typography
							variant="h4"
							align="center"
							fontWeight="bold"
							color="#435A12"
							gutterBottom
						>
							Register My Venue
						</Typography>

						<Stack spacing={3} mt={3}>
							<TextField
								label="Venue Name"
								name="venueName"
								value={formData.venueName}
								onChange={handleChange}
							/>
							<TextField
								label="City"
								name="city"
								value={formData.city}
								onChange={handleChange}
							/>
							<TextField
								label="Postcode"
								name="postcode"
								value={formData.postcode}
								onChange={handleChange}
							/>

							<TextField
								label="Logo Image URL"
								name="logoUrl"
								value={formData.logoUrl}
								onChange={handleChange}
							/>

							<Button
								variant="contained"
								onClick={handleSubmit}
								sx={{
									mt: 2,
									backgroundColor: "#7E8E20",
									color: "#fff",
									textTransform: "none",
									"&:hover": {
										backgroundColor: "#5E6F1A",
									},
								}}
							>
								Register Venue
							</Button>
						</Stack>
					</Paper>

					{/* Order Status Progress */}
					<Box my={5}>
						<Typography
							variant="h5"
							align="center"
							fontWeight="bold"
							color="#435A12"
							sx={{ mb: 3 }}
						>
							Order Status Steps
						</Typography>
						<Stepper activeStep={3} alternativeLabel>
							{steps.map((step, index) => (
								<Step key={index}>
									<StepLabel icon={step.icon}>
										<Typography fontSize={14}>{step.label}</Typography>
									</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
				</Container>
			</Box>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
