import React from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "../contexts/SnackBarContext";
import { registerVenue } from "../API/authAPI";

export default function RegisterVenuePage() {
	const theme = useTheme();
	const { showSnackbar } = useSnackbar();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			venueName: "",
			city: "",
			postcode: "",
			logoUrl: "",
		},
	});

	const steps = [
		{
			label: "Order Received",
			icon: (
				<ShoppingBagIcon
					sx={{ color: theme.palette.secondary.main, fontSize: 40 }}
				/>
			),
		},
		{
			label: "Prepare Order",
			icon: (
				<RestaurantIcon
					sx={{ color: theme.palette.secondary.main, fontSize: 40 }}
				/>
			),
		},
		{
			label: "Customer Pickup",
			icon: (
				<DirectionsWalkIcon
					sx={{ color: theme.palette.secondary.main, fontSize: 40 }}
				/>
			),
		},
		{
			label: "Order Done",
			icon: (
				<CheckCircleIcon
					sx={{ color: theme.palette.secondary.main, fontSize: 40 }}
				/>
			),
		},
	];

	const onSubmit = async (data) => {
		const payload = {
			...data,
			city: data.city.toLowerCase().trim(),
		};

		try {
			const res = await registerVenue(payload);

			if (res?.success) {
				showSnackbar("Registration successful!", "success");
				reset();
				return;
			}

			if (res?.errors && typeof res.errors === "object") {
				Object.entries(res.errors).forEach(([field, message]) => {
					setError(field, { type: "server", message });
				});
				return;
			}

			showSnackbar("Registration failed.", "error");
		} catch (err) {
			showSnackbar(
				`Registration failed: ${err?.message ?? "Unexpected server error"}`,
				"error"
			);
		}
	};

	return (
		<Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
			{/* Hero Banner */}
			<Box
				sx={{
					px: 2,
					py: { xs: 6, md: 8 },
					textAlign: "center",
					backgroundImage:
						"url('https://m.media-amazon.com/images/I/81PdBK+WaWL.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: theme.palette.common.white,
				}}
			>
				<Container maxWidth="md">
					<Typography variant="h1" sx={{ mb: 2 }}>
						Partner with CoffeeQue
					</Typography>
					<Typography variant="body1">
						Register your venue to serve more customers, faster.
					</Typography>
				</Container>
			</Box>

			{/* Form Card */}
			<Container maxWidth="sm" sx={{ pb: 5 }}>
				<Paper elevation={3} sx={{ p: 4, mt: 6 }}>
					<Typography
						variant="h4"
						align="center"
						color={theme.palette.primary.main}
						gutterBottom
					>
						Register My Venue
					</Typography>

					<Stack
						spacing={3}
						mt={3}
						component="form"
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* Venue Name */}
						<TextField
							label="Venue Name"
							fullWidth
							{...register("venueName", {
								required: "Venue name is required",
								minLength: { value: 2, message: "Must be at least 2 characters" },
							})}
							error={!!errors.venueName}
							helperText={errors.venueName?.message}
						/>

						{/* City */}
						<TextField
							label="City"
							fullWidth
							{...register("city", {
								required: "City is required",
								pattern: {
									value: /^[a-zA-Z\s'-]+$/,
									message: "Only letters and spaces are allowed",
								},
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>

						{/* Postcode */}
						<TextField
							label="Postcode"
							fullWidth
							{...register("postcode", {
								required: "Postcode is required",
								pattern: {
									value: /^\d{4}$/,
									message: "Postcode must be 4 digits",
								},
							})}
							error={!!errors.postcode}
							helperText={errors.postcode?.message}
						/>

						{/* Logo URL */}
						<TextField
							label="Logo Image URL"
							fullWidth
							{...register("logoUrl", {
								required: "Logo image URL is required",
								pattern: {
									value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
									message: "Enter a valid image URL",
								},
							})}
							error={!!errors.logoUrl}
							helperText={errors.logoUrl?.message}
						/>

						{/* Submit */}
						<Button
							variant="contained"
							color="secondary"
							type="submit"
							sx={{ mt: 2 }}
						>
							Register Venue
						</Button>
					</Stack>
				</Paper>

				{/* Order Progress Demo */}
				<Box my={5}>
					<Typography
						variant="h4"
						align="center"
						color={theme.palette.text.secondary}
						sx={{ mb: 3 }}
					>
						Order Status Steps
					</Typography>
					<Stepper activeStep={3} alternativeLabel>
						{steps.map((step, idx) => (
							<Step key={idx}>
								<StepLabel icon={step.icon}>
									<Typography variant="body2">{step.label}</Typography>
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			</Container>
		</Box>
	);
}
