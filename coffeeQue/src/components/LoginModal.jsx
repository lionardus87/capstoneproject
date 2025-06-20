import React, { useState, useContext } from "react";
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
import useSnackbar from "../hooks/useSnackbar";
import { AuthContext } from "../contexts/AuthContext";
import { loginRequest } from "../API/authAPI";

export default function LoginModal({ open, onClose }) {
	const [formData, setFormData] = useState({ identifier: "", password: "" });
	const [signup, setSignup] = useState(false);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();
	const { authDispatch } = useContext(AuthContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	//Login logic
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.identifier || !formData.password) {
			showSnackbar("Username and password are required", "error");
			return;
		}
		try {
			const result = await loginRequest(formData);
			if (result.success) {
				authDispatch({
					type: "signIn",
					payload: {
						user: result.user,
						accessToken: result.accessToken,
						refreshToken: result.refreshToken,
					},
				});
				showSnackbar("Login successful!", "success");
				onClose();
				setFormData({ identifier: "", password: "" });
			} else {
				showSnackbar(
					"Login failed: " + (result.message || "Unknown error"),
					"error"
				);
			}
		} catch (e) {
			showSnackbar("Login failed: " + (e.message || "Unexpected error"), "error");
			console.error(e);
		}
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
								type="password"
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
					<Typography
						component="button"
						onClick={() => setSignup(true)}
						sx={{
							border: "none",
							background: "none",
							color: "#435A12",
							cursor: "pointer",
							textDecoration: "underline",
							"&:hover": { color: "#5E6F1A" },
						}}
					>
						Sign Up
					</Typography>
				</Box>
			</Dialog>

			{/* Signup Modal */}
			<SignupModal open={signup} onClose={() => setSignup(false)} />

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
