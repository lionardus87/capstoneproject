import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	TextField,
	Button,
	Grid,
	Paper,
	Stack,
	Fab,
	Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatIcon from "@mui/icons-material/Chat";
import { useForm, Controller } from "react-hook-form";
import { sendFeedbackMsg } from "../API/messageAPI";
import { useSnackbar } from "../contexts/SnackBarContext";
import SupportChat from "../components/SupportChat";

export default function ContactPage() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});
	const [showChat, setShowChat] = useState(false);
	const { showSnackbar } = useSnackbar();
	const theme = useTheme();

	const onSubmit = async (data) => {
		try {
			await sendFeedbackMsg(data);
			showSnackbar("Message sent successfully!", "success");
			reset();
		} catch (err) {
			console.error("Send error:", err);
			showSnackbar("Failed to send message.", "error");
		}
	};

	return (
		<Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
			{/* Hero Banner */}
			<Box
				sx={{
					px: 2,
					py: { xs: 6, md: 8 },
					mb: 5,
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
						Feedback
					</Typography>
					<Typography variant="body1">
						We love hearing your feedback and support for continous improvement.
					</Typography>
				</Container>
			</Box>

			{/* Form Card */}
			<Container maxWidth="md">
				<Paper
					elevation={3}
					sx={{ p: 5, borderRadius: 3, backgroundColor: "background.paper" }}
				>
					<Typography
						variant="h4"
						align="center"
						gutterBottom
						sx={{ color: "text.secondary" }}
					>
						Contact Us
					</Typography>
					<Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
						We'd love to hear from you. Please fill out the form below.
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Stack spacing={3}>
							<Controller
								name="name"
								control={control}
								rules={{ required: "Name is required" }}
								render={({ field }) => (
									<TextField
										{...field}
										label="Name"
										fullWidth
										error={!!errors.name}
										helperText={errors.name?.message}
									/>
								)}
							/>

							<Controller
								name="email"
								control={control}
								rules={{
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="Email"
										type="email"
										fullWidth
										error={!!errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>

							<Controller
								name="message"
								control={control}
								rules={{ required: "Message is required" }}
								render={({ field }) => (
									<TextField
										{...field}
										label="Message"
										multiline
										rows={4}
										fullWidth
										error={!!errors.message}
										helperText={errors.message?.message}
									/>
								)}
							/>

							<Button
								type="submit"
								variant="contained"
								disabled={isSubmitting}
								sx={{
									backgroundColor: "#7E8E20",
									color: "#fff",
									textTransform: "none",
									width: "150px",
									alignSelf: "center",
									"&:hover": {
										backgroundColor: "#5E6F1A",
									},
								}}
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</Button>
						</Stack>
					</form>

					<Grid container direction="column" spacing={3} mt={5}>
						<Grid size={{ xs: 12 }}>
							<Typography variant="h4" sx={{ color: "text.secondary" }}>
								Address
							</Typography>
							<Typography variant="body1">
								123 Coffee Lane, Sydney, NSW 2000
							</Typography>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<Typography variant="h4" sx={{ color: "text.secondary" }}>
								Contact
							</Typography>
							<Typography variant="body1">Email: support@coffeeque.com.au</Typography>
							<Typography variant="body1">Phone: +61 2 1234 5678</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Container>

			{/* Floating Chat Icon */}
			<Fab
				color="primary"
				sx={{ position: "fixed", bottom: 24, right: 24 }}
				onClick={() => setShowChat((prev) => !prev)}
			>
				<Badge
					color="error"
					variant="dot"
					invisible={true /* TODO: unread state */}
				>
					<ChatIcon />
				</Badge>
			</Fab>

			{/* Chat Component */}
			{showChat && (
				<Box
					sx={{
						position: "fixed",
						bottom: 90,
						right: 24,
						width: 360,
						maxHeight: 500,
						zIndex: 9999,
					}}
				>
					<SupportChat />
				</Box>
			)}
		</Box>
	);
}
