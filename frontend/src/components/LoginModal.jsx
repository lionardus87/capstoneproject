import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import BaseModal from "./BaseModal";
import SignupModal from "./SignupModal";
import useSnackbar from "../hooks/useSnackbar";

export default function LoginModal({ open, onClose, onSave }) {
	const [formData, setFormData] = useState({ identifier: "", password: "" });
	const [signup, setSignup] = useState(false);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		if (!formData.identifier || !formData.password) {
			showSnackbar("Username and password are required", "error");
			return;
		}

		const result = await onSave(formData);
		if (result?.success) {
			showSnackbar("Login successful!", "success");
			onClose();
		} else {
			showSnackbar("Login failed: " + result?.message, "error");
		}
	};

	const modalBody = (
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
					sx={{ width: 400 }}
				/>
			</Stack>
			<Box
				py={3}
				textAlign="center"
				sx={{
					display: "flex",
					justifyContent: "center",
					color: "#435A12",
				}}
			>
				<Typography variant="body2">Don't have an account?</Typography>
				<Typography
					component="button"
					onClick={() => setSignup(true)}
					sx={{
						border: "none",
						background: "none",
						color: "#435A12",
						cursor: "pointer",
						textDecoration: "underline",
						ml: 1,
						"&:hover": { color: "#5E6F1A" },
					}}
				>
					Sign Up
				</Typography>
			</Box>
		</Box>
	);

	const modalActions = (
		<>
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
					"&:hover": { backgroundColor: "#5E6F1A" },
				}}
			>
				Login
			</Button>
		</>
	);

	return (
		<>
			<BaseModal
				open={open}
				onClose={onClose}
				title="Welcome Back"
				children={modalBody}
				actions={modalActions}
				snackbar={snackbar}
				onSnackbarClose={handleClose}
			/>

			<SignupModal open={signup} onClose={() => setSignup(false)} />
		</>
	);
}

// import React, { useState } from "react";
// import {
// 	Box,
// 	Button,
// 	Dialog,
// 	DialogTitle,
// 	DialogContent,
// 	TextField,
// 	DialogActions,
// 	Typography,
// 	Stack,
// 	Snackbar,
// 	Alert,
// } from "@mui/material";
// import SignupModal from "./SignupModal";
// import useSnackbar from "../hooks/useSnackbar";

// export default function LoginModal({ open, onClose, onSave }) {
// 	const [formData, setFormData] = useState({ identifier: "", password: "" });
// 	const [signup, setSignup] = useState(false);
// 	const { snackbar, showSnackbar, handleClose } = useSnackbar();

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleSubmit = async () => {
// 		const result = await onSave(formData); // expected to return { success, message? }

// 		if (result.success) {
// 			showSnackbar("Login successful", "success");
// 			onClose(); // only close if successful
// 			setFormData({ identifier: "", password: "" });
// 		} else {
// 			showSnackbar(result.message || "Login failed", "error");
// 		}
// 	};

// 	const handleSignup = async (formData) => {
// 		console.log("Signup:", formData);

// 		// Simulate successful signup
// 		return { success: true };
// 	};

// 	return (
// 		<>
// 			<Dialog open={open} onClose={onClose} disableScrollLock>
// 				<DialogTitle
// 					sx={{
// 						backgroundColor: "#F7F9F3",
// 						color: "#435A12",
// 						textAlign: "center",
// 						fontWeight: "bold",
// 						p: 3,
// 					}}
// 				>
// 					Welcome Back
// 				</DialogTitle>
// 				<DialogContent sx={{ backgroundColor: "#F7F9F3" }}>
// 					<Box sx={{ pt: 3, pb: 2, px: 8 }}>
// 						<Stack spacing={3}>
// 							<TextField
// 								label="Username or Email"
// 								name="identifier"
// 								fullWidth
// 								variant="outlined"
// 								value={formData.identifier}
// 								onChange={handleChange}
// 								sx={{ width: 400 }}
// 							/>
// 							<TextField
// 								label="Password"
// 								type="password"
// 								name="password"
// 								fullWidth
// 								variant="outlined"
// 								value={formData.password}
// 								onChange={handleChange}
// 							/>
// 						</Stack>
// 					</Box>
// 				</DialogContent>
// 				<DialogActions
// 					sx={{
// 						backgroundColor: "#F7F9F3",
// 						justifyContent: "center",
// 						px: 3,
// 						pb: 2,
// 					}}
// 				>
// 					<Button
// 						variant="contained"
// 						onClick={onClose}
// 						sx={{ textTransform: "none", backgroundColor: "#fff", color: "#435A12" }}
// 					>
// 						Cancel
// 					</Button>
// 					<Button
// 						variant="contained"
// 						onClick={handleSubmit}
// 						sx={{
// 							backgroundColor: "#7E8E20",
// 							color: "#fff",
// 							textTransform: "none",
// 							"&:hover": {
// 								backgroundColor: "#5E6F1A",
// 							},
// 						}}
// 					>
// 						Login
// 					</Button>
// 				</DialogActions>
// 				<Box
// 					py={3}
// 					textAlign="center"
// 					sx={{
// 						display: "flex",
// 						backgroundColor: "#F7F9F3",
// 						justifyContent: "center",
// 					}}
// 				>
// 					<Typography variant="body2" sx={{ color: "#435A12" }}>
// 						Don't have an account?
// 					</Typography>
// 					<Typography
// 						component="button"
// 						onClick={() => setSignup(true)}
// 						sx={{
// 							border: "none",
// 							background: "none",
// 							color: "#435A12",
// 							cursor: "pointer",
// 							textDecoration: "underline",
// 							"&:hover": { color: "#5E6F1A" },
// 						}}
// 					>
// 						Sign Up
// 					</Typography>
// 				</Box>
// 			</Dialog>

// 			{/* Signup Modal */}
// 			<SignupModal
// 				open={signup}
// 				onClose={() => setSignup(false)}
// 				onSave={handleSignup}
// 			/>

// 			{/* Snackbar toast */}
// 			<Snackbar
// 				open={snackbar.open}
// 				autoHideDuration={4000}
// 				onClose={handleClose}
// 				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// 			>
// 				<Alert
// 					onClose={handleClose}
// 					severity={snackbar.severity}
// 					sx={{ width: "100%" }}
// 				>
// 					{snackbar.message}
// 				</Alert>
// 			</Snackbar>
// 		</>
// 	);
// }
