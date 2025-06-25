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
import useSnackbar from "../../hooks/useSnackbar";
import { AuthContext } from "../../contexts/AuthContext";
import { loginRequest } from "../../API/authAPI";
import { useForm } from "react-hook-form";

export default function LoginModal({ open, onClose }) {
	// const [formData, setFormData] = useState({ identifier: "", password: "" });
	const [signup, setSignup] = useState(false);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();
	const { authDispatch } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData((prev) => ({ ...prev, [name]: value }));
	// };

	//Login logic
	const onSubmit = async (data) => {
		try {
			const result = await loginRequest(data);
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
				reset(); // Clear form
			} else {
				showSnackbar(
					"Login failed: " + (result.message || "Unknown error"),
					"error"
				);
			}
		} catch (error) {
			showSnackbar(
				"Login failed: " + (error.message || "Unexpected error"),
				"error"
			);
			console.error(error);
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth="sm"
				fullWidth
				disableScrollLock
			>
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
								{...register("identifier", {
									required: "Username or email is required",
								})}
								error={!!errors.identifier}
								helperText={errors.identifier?.message}
								fullWidth
								sx={{ width: 400 }}
							/>

							<TextField
								label="Password"
								type="password"
								{...register("password", { required: "Password is required" })}
								error={!!errors.password}
								helperText={errors.password?.message}
								fullWidth
							/>
							{/* <TextField
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
							/> */}
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
						onClick={handleSubmit(onSubmit)}
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
