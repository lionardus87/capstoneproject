import React from "react";
import { Box, TextField, Stack, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { registerUser } from "../../API/authAPI";
import { useSnackbar } from "../../contexts/SnackBarContext";
import BaseModal from "./BaseModal";

export default function SignupModal({ open, onClose }) {
	const { showSnackbar } = useSnackbar();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const { username, email, password } = data;
		try {
			const result = await registerUser({ username, email, password });
			if (result?.success) {
				showSnackbar("Signup successful!", "success");
				reset(); // Clear form
				onClose();
			} else {
				showSnackbar(result?.message || "Signup failed. Try again.", "error");
			}
		} catch (error) {
			showSnackbar(
				"Signup failed: " + (error?.message || "Server error"),
				"error"
			);
		}
	};

	return (
		<BaseModal
			open={open}
			onClose={() => {
				reset();
				onClose();
			}}
			title="Create New Account"
			actions={
				<>
					<Button
						variant="contained"
						onClick={() => {
							reset();
							onClose();
						}}
						sx={{
							textTransform: "none",
							backgroundColor: "#fff",
							color: "primary.main",
						}}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						sx={{
							backgroundColor: "primary.main",
							color: "#fff",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "primary.dark",
							},
						}}
					>
						Signup
					</Button>
				</>
			}
		>
			<Box sx={{ pt: 1, pb: 2 }}>
				<Stack spacing={3} sx={{ px: 4 }}>
					<TextField
						label="Username"
						{...register("username", {
							required: "Username is required",
							minLength: { value: 3, message: "Minimum 3 characters" },
						})}
						error={!!errors.username}
						helperText={errors.username?.message}
						fullWidth
					/>

					<TextField
						label="Email"
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
						fullWidth
					/>

					<TextField
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Minimum 6 characters",
							},
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
						fullWidth
					/>

					<TextField
						label="Re-type Password"
						type="password"
						{...register("repassword", {
							required: "Please re-type your password",
							validate: (value) =>
								value === watch("password") || "Passwords do not match",
						})}
						error={!!errors.repassword}
						helperText={errors.repassword?.message}
						fullWidth
					/>
				</Stack>
			</Box>
		</BaseModal>
	);
}
