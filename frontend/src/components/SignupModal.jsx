import React, { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Typography,
	Stack,
} from "@mui/material";

export default function SignupModal({ open, onClose, onSave }) {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		repassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		if (formData.password !== formData.repassword) {
			alert("Passwords do not match.");
			return;
		}
		if (onSave) {
			const result = await onSave(formData);
			if (result?.success) {
				alert("Signup successful!");
				onClose();
			} else {
				alert("Signup failed: " + result?.message);
			}
		}
	};

	return (
		<Dialog open={open} onClose={onClose} disableScrollLock>
			<DialogTitle
				sx={{
					backgroundColor: "#F7F9F3",
					color: "#435A12",
					textAlign: "center",
					fontWeight: "bold",
					p: 3,
				}}
			>
				Create New Account
			</DialogTitle>
			<DialogContent sx={{ backgroundColor: "#F7F9F3" }}>
				<Box sx={{ pt: 3, pb: 5, px: 8 }}>
					<Stack spacing={3}>
						<TextField
							label="Username"
							name="username"
							fullWidth
							variant="outlined"
							value={formData.username}
							onChange={handleChange}
							sx={{ width: 400 }}
						/>
						<TextField
							label="Email"
							name="email"
							fullWidth
							variant="outlined"
							value={formData.email}
							onChange={handleChange}
							sx={{ width: 400 }}
						/>
						<TextField
							label="Password"
							name="password"
							fullWidth
							variant="outlined"
							value={formData.password}
							onChange={handleChange}
						/>
						<TextField
							label="Re-type Password"
							name="repassword"
							fullWidth
							variant="outlined"
							value={formData.repassword}
							onChange={handleChange}
							sx={{ width: 400 }}
						/>
					</Stack>
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					backgroundColor: "#F7F9F3",
					justifyContent: "space-between",
					px: 3,
					pb: 2,
				}}
			>
				<Button
					variant="contained"
					onClick={onClose}
					sx={{ textTransform: "none", backgroundColor: "#fff", color: "#435A12" }}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					onClick={handleSubmit}
					sx={{
						backgroundColor: "#7E8E20",
						color: "#fff",
						textTransform: "none",
						"&:hover": {
							backgroundColor: "#5E6F1A",
						},
					}}
				>
					Signup
				</Button>
			</DialogActions>
		</Dialog>
	);
}
