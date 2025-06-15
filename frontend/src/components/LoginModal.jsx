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
	Snackbar,
	Alert,
} from "@mui/material";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar";

export default function LoginModal({ open, onClose, onSave }) {
	const [formData, setFormData] = useState({ identifier: "", password: "" });
	const [signup, setSignup] = useState(false);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async () => {
		if (onSave) {
			const result = await onSave(formData);
			if (result?.success) {
				showSnackbar("Login successful!", "success");
				onClose();
			} else {
				showSnackbar("Login failed: " + result?.message, "error");
			}
		}
	};

	const handleSignup = async (formData) => {
		console.log("Signup:", formData);

		// Simulate successful signup
		return { success: true };
	};

	return (
		<>
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
					Welcome Back
				</DialogTitle>
				<DialogContent sx={{ backgroundColor: "#F7F9F3" }}>
					<Box sx={{ pt: 3, pb: 2, px: 8 }}>
						<Stack spacing={3}>
							<TextField
								label="Username or Email"
								name="identifier"
								fullWidth
								variant="outlined"
								value={formData.identifier}
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
						</Stack>
					</Box>
				</DialogContent>
				<DialogActions
					sx={{
						backgroundColor: "#F7F9F3",
						justifyContent: "center",
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
						onClick={handleLogin}
						sx={{
							backgroundColor: "#7E8E20",
							color: "#fff",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "#5E6F1A",
							},
						}}
					>
						Login
					</Button>
				</DialogActions>
				<Box
					py={3}
					textAlign="center"
					sx={{
						display: "flex",
						backgroundColor: "#F7F9F3",
						justifyContent: "center",
					}}
				>
					<Typography variant="body2" sx={{ color: "#435A12" }}>
						Don't have an account?
					</Typography>
					<Link
						variant="outlined"
						onClick={() => setSignup(true)}
						sx={{
							mt: 1,
							backgroundColor: "#ffffff",
							"&:hover": {
								color: "#5E6F1A",
							},
							"&:active": { backgroundColor: "#5E6F1A" },
						}}
					>
						Sign Up
					</Link>
				</Box>
			</Dialog>

			{/* Signup Modal */}
			<SignupModal
				open={signup}
				onClose={() => setSignup(false)}
				onSave={handleSignup}
			/>

			{/* Snackbar toast */}
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
