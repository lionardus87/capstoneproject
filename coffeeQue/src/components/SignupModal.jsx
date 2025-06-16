import React, { useState } from "react";
import { TextField, Stack, Button, Snackbar, Alert } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";
import { registerUser } from "../API/authAPI";
import BaseModal from "./BaseModal";

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
			<BaseModal
				open={open}
				onClose={onClose}
				snackbar={snackbar}
				onSnackbarClose={handleClose}
				title="Create New Account"
				actions={
					<>
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
					</>
				}
			>
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
			</BaseModal>
		</>
	);
}
