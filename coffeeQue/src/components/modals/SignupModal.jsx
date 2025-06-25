import React, { useState } from "react";
import {
	Box,
	TextField,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import useSnackbar from "../../hooks/useSnackbar";
import { registerUser } from "../../API/authAPI";

export default function SignupModal({ open, onClose }) {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		repassword: "",
	});
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	//Register user
	const handleSubmit = async () => {
		const missingFields = Object.entries(formData)
			.filter(([, value]) => !value.trim())
			.map(([key]) => key);
		if (missingFields.length > 0) {
			showSnackbar(`${missingFields.join(", ")} field(s) are missing`, "error");
			return;
		}
		if (formData.password !== formData.repassword) {
			showSnackbar("Passwords do not match.", "error");
			return;
		}
		try {
			const { username, email, password } = formData;
			const result = await registerUser({ username, email, password });
			if (result?.success) {
				showSnackbar("Signup successful!", "success");
				onClose();
				setFormData({ username: "", email: "", password: "", repassword: "" });
			} else {
				showSnackbar("Signup failed. Try a different email or username.", "error");
			}
		} catch (error) {
			showSnackbar(
				"Signup failed: " + (error?.message || "Server error"),
				"error"
			);
		}
	};

	return (
		<>
			<Dialog open={open} onClose={onClose} fullWidth disableScrollLock>
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

				<DialogContent sx={{ backgroundColor: "#F7F9F3", px: 8, pt: 3 }}>
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
							type="password"
							name="password"
							fullWidth
							variant="outlined"
							value={formData.password}
							onChange={handleChange}
							sx={{ width: 400 }}
						/>
						<TextField
							label="Re-type Password"
							type="password"
							name="repassword"
							fullWidth
							variant="outlined"
							value={formData.repassword}
							onChange={handleChange}
							sx={{ width: 400 }}
						/>
					</Stack>
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
						sx={{
							textTransform: "none",
							backgroundColor: "#fff",
							color: "#435A12",
						}}
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
