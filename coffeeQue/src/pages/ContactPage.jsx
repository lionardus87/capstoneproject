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
import ChatIcon from "@mui/icons-material/Chat";
import { sendFeedbackMsg } from "../API/contactAPI";
import { useSnackbar } from "../contexts/SnackBarContext";
import SupportChat from "../components/SupportChat"; // 👈 Import your chat component

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [showChat, setShowChat] = useState(false); // 👈 Toggle chat
	const { showSnackbar } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await sendFeedbackMsg(formData);
			showSnackbar("Message sent successfully!", "success");
			setFormData({ name: "", email: "", message: "" });
		} catch (err) {
			console.error("Send error:", err);
			showSnackbar("Failed to send message.", "error");
		}
		setLoading(false);
	};

	return (
		<>
			<Box
				sx={{
					minHeight: "80vh",
					backgroundColor: "background.default",
					display: "flex",
					alignItems: "start",
					justifyContent: "center",
					position: "relative",
					py: { xs: 4, md: 8 },
				}}
			>
				<Container maxWidth="md">
					<Paper
						elevation={3}
						sx={{ p: 5, borderRadius: 3, backgroundColor: "background.paper" }}
					>
						<Typography
							variant="h4"
							align="center"
							gutterBottom
							sx={{ color: "#435A12" }}
						>
							Contact Us
						</Typography>
						<Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
							We'd love to hear from you. Please fill out the form below.
						</Typography>
						<form onSubmit={handleSubmit}>
							<Stack spacing={3}>
								<TextField
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									fullWidth
									required
									sx={{ borderRadius: 2, backgroundColor: "background.textfield" }}
								/>
								<TextField
									label="Email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									fullWidth
									required
									sx={{ borderRadius: 2, backgroundColor: "whitesmoke" }}
								/>
								<TextField
									label="Message"
									name="message"
									multiline
									rows={4}
									value={formData.message}
									onChange={handleChange}
									fullWidth
									required
									sx={{ borderRadius: 2, backgroundColor: "whitesmoke" }}
								/>
								<Button
									type="submit"
									variant="contained"
									disabled={loading}
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
									{loading ? "Sending..." : "Send Message"}
								</Button>
							</Stack>
						</form>

						<Grid container direction="column" spacing={3} mt={5}>
							<Grid item xs={12}>
								<Typography variant="h6" sx={{ color: "#435A12" }}>
									Address
								</Typography>
								<Typography variant="body2">
									123 Coffee Lane, Sydney, NSW 2000
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6" sx={{ color: "#435A12" }}>
									Contact
								</Typography>
								<Typography variant="body2">Email: support@coffeeque.com.au</Typography>
								<Typography variant="body2">Phone: +61 2 1234 5678</Typography>
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
						invisible={true /* You can replace with unread state later */}
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
		</>
	);
}
