import React, { useState } from "react";
import { Box, TextField, Stack, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginRequest } from "../../API/authAPI";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "../../contexts/SnackBarContext";
import BaseModal from "./BaseModal";
import SignupModal from "./SignupModal";

export default function LoginModal({ open, onClose }) {
	const [signup, setSignup] = useState(false);
	const { authDispatch } = useAuth();
	const { showSnackbar } = useSnackbar();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

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
				showSnackbar(`Welcome ${result.user?.username || "user"}`, "success");
				reset();
				onClose();
			} else {
				showSnackbar(result.message || "Login failed", "error");
			}
		} catch (error) {
			console.error(error);
			showSnackbar(error.message || "Unexpected error", "error");
		}
	};

	return (
		<>
			<BaseModal
				open={open}
				onClose={onClose}
				title="Welcome Back"
				actions={
					<>
						<Button
							variant="contained"
							onClick={onClose}
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
							Login
						</Button>
					</>
				}
			>
				<Box sx={{ pt: 1, pb: 2 }}>
					<Stack spacing={3} sx={{ px: 4 }}>
						<TextField
							label="Username or Email"
							{...register("identifier", {
								required: "Username or email is required",
							})}
							error={!!errors.identifier}
							helperText={errors.identifier?.message}
							fullWidth
						/>

						<TextField
							label="Password"
							type="password"
							{...register("password", {
								required: "Password is required",
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
							fullWidth
						/>
					</Stack>
				</Box>

				<Box
					py={3}
					textAlign="center"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 1,
						backgroundColor: "background.default",
					}}
				>
					<Typography variant="body2" sx={{ color: "primary.main" }}>
						Don't have an account?
					</Typography>
					<Typography
						component="button"
						onClick={() => setSignup(true)}
						sx={{
							border: "none",
							background: "none",
							color: "primary.main",
							cursor: "pointer",
							textDecoration: "underline",
							"&:hover": { color: "primary.dark" },
						}}
					>
						Sign Up
					</Typography>
				</Box>
			</BaseModal>

			<SignupModal open={signup} onClose={() => setSignup(false)} />
		</>
	);
}
