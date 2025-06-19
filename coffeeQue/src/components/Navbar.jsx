import React, { useState, useContext } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	Stack,
	ButtonBase,
	Box,
	Snackbar,
	Alert,
} from "@mui/material";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router";
import logo from "../assets/CQ.png";
import { AuthContext } from "../contexts/AuthContext";
import { loginRequest } from "../API/authAPI";
import useSnackbar from "../hooks/useSnackbar";

export default function Navbar() {
	const [signin, setSignin] = useState(false);
	const navigate = useNavigate();
	const { auth, authDispatch } = useContext(AuthContext);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	// Login logic
	const handleLogin = async (formData) => {
		try {
			const { accessToken, refreshToken, user } = await loginRequest(formData);

			authDispatch({
				type: "signIn",
				payload: { user, accessToken, refreshToken },
			});
			return { success: true };
		} catch (err) {
			console.error("Login failed:", err);

			return {
				success: false,
				message: err?.response?.data?.message || "Invalid credentials",
			};
		}
	};

	// Logout logic
	const handleLogout = () => {
		authDispatch({ type: "signOut" });
		showSnackbar("Logout successful", "success");
		console.log(sessionStorage);
		navigate("/");
	};

	// Order button logic
	const handleOrderClick = () => {
		if (!auth.isLogin) {
			setSignin(true); // Show login modal
			showSnackbar("Please login to place an order", "info");
		} else {
			navigate("/order");
		}
	};

	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				sx={{
					backgroundColor: "#DCE5D2",
					color: "#435A12",
					paddingY: 1.5,
				}}
			>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<ButtonBase onClick={() => navigate("/")}>
						<Box
							component="img"
							src={logo}
							alt="CoffeeQue Logo"
							sx={{ height: 50, mr: 2, borderRadius: "50%", objectFit: "cover" }}
						/>
					</ButtonBase>
					{/* <Button
						onClick={() => navigate("/")}
						variant="h6"
						sx={{
							fontWeight: "bold",
							fontFamily: "'Playfair Display', serif",
							color: "#435A12",
						}}
					>
						CoffeeQue
					</Button> */}

					{/* <Stack direction="row" spacing={3} alignItems="center">
						{["Home", "Products", "ContactUs"].map((item, index) => (
							<Button
								key={index}
								disableRipple
								sx={{
									textTransform: "none",
									color: "#435A12",
									fontWeight: item === "Home" ? "bold" : "normal",
									borderBottom: item === "Home" ? "2px solid #B6CA93" : "none",
									borderRadius: 0,
									fontFamily: "inherit",
									"&:hover": {
										backgroundColor: "transparent",
										borderBottom: "2px solid #B6CA93",
									},
								}}
							>
								{item}
							</Button>
						))}
					</Stack> */}

					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							onClick={handleOrderClick}
							sx={{
								backgroundColor: "#7E8E20",
								color: "#fff",
								borderRadius: "20px",
								textTransform: "none",
								paddingX: 3,
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: "#5E6F1A",
								},
							}}
						>
							Order now
						</Button>

						{/* Login and Logout button */}
						{!auth.isLogin ? (
							<Button
								variant="contained"
								onClick={() => setSignin(true)}
								sx={{
									backgroundColor: "#fff",
									color: "#435A12",
									borderRadius: "20px",
									textTransform: "none",
									paddingX: 3,
									fontWeight: "bold",
									"&:hover": {
										backgroundColor: "#5E6F1A",
										color: "#fff",
									},
								}}
							>
								Login
							</Button>
						) : (
							<Button
								variant="contained"
								onClick={handleLogout}
								sx={{
									backgroundColor: "#fff",
									color: "#435A12",
									borderRadius: "20px",
									textTransform: "none",
									paddingX: 3,
									fontWeight: "bold",
									"&:hover": {
										backgroundColor: "#5E6F1A",
										color: "#fff",
									},
								}}
							>
								Logout
							</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>

			{/* Login Modal */}
			<LoginModal
				open={signin}
				onClose={() => setSignin(false)}
				onSave={handleLogin}
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
