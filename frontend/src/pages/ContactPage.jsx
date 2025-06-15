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
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Message sent! Thank you.");
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<Box
			sx={{
				minHeight: "80vh",
				backgroundColor: "#F7F9F3",
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
					sx={{ p: 5, borderRadius: 3, backgroundColor: "#DCE5D2" }}
				>
					<Typography
						variant="h4"
						align="center"
						gutterbottom
						sx={{ color: "#435A12" }}
					>
						Contact Us
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						sx={{ mb: 4, color: "#435A12" }}
					>
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
								sx={{ borderRadius: 2, backgroundColor: "whitesmoke" }}
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
								Send Message
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

			{/* Chat Icon Floating Button */}
			<Fab
				color="primary"
				sx={{
					position: "fixed",
					bottom: 24,
					right: 24,
					backgroundColor: "#435A12",
					border: "2px solid",
					"&:hover": { backgroundColor: "#5E6F1A" },
				}}
				aria-label="chat"
				onClick={() => alert("Live chat coming soon!")}
			>
				<ChatIcon />
			</Fab>
		</Box>
	);
}
