import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Stack,
	ButtonBase,
	Box,
	Snackbar,
	Alert,
	Menu,
	MenuItem,
	IconButton,
	Typography,
	Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router";
import logo from "../assets/CQ.png";
import { useAuth } from "../contexts/AuthContext";
import { loginRequest } from "../API/authAPI";
import useSnackbar from "../hooks/useSnackbar";

export default function Navbar() {
	const [signin, setSignin] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const { auth, authDispatch } = useAuth();
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const isMenuOpen = Boolean(anchorEl);
	console.log("auth", auth);

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
		handleMenuClose();
		showSnackbar("Logout successful", "success");
		navigate("/");
	};

	// Menu actions
	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleNavigate = (path) => {
		navigate(path);
		handleMenuClose();
	};

	const getMenuItems = () => {
		if (!auth.isLogin) return [];

		const items = [];

		if (auth.user.role === "admin" && auth.user?.venueId) {
			items.push(
				{
					key: "menu",
					label: "Menu",
					onClick: () =>
						handleNavigate(`/admin/venues/${auth.user.venueId}/products`),
				},
				{
					key: "add",
					label: "Add Product",
					onClick: () => handleNavigate("/add-product"),
				}
			);
		}

		if (auth.user.role === "member") {
			items.push(
				{
					key: "orders",
					label: "Order Now",
					onClick: () => handleNavigate("/order-now"),
				},
				{
					key: "status",
					label: "Order Status",
					onClick: () => handleNavigate("/order-status"),
				}
			);
		}

		items.push({ key: "logout", label: "Logout", onClick: handleLogout });

		return items;
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

					<Stack direction="row" spacing={2} alignItems="center">
						{!auth.isLogin ? (
							<Button
								startIcon={<AccountCircleIcon />}
								onClick={() => setSignin(true)}
								sx={{
									backgroundColor: "#fff",
									color: "#435A12",
									borderRadius: "20px",
									textTransform: "none",
									paddingX: 2,
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
							<>
								<IconButton
									onClick={handleMenuClick}
									sx={{ color: "#435A12" }}
									size="large"
								>
									<AccountCircleIcon fontSize="large" />
								</IconButton>
								<Typography
									onClick={handleMenuClick}
									sx={{
										cursor: "pointer",
										fontWeight: "bold",
										color: "#435A12",
									}}
								>
									{auth.user?.username || "User"}
								</Typography>
							</>
						)}
					</Stack>
				</Toolbar>
			</AppBar>

			{/* User menu */}
			<Menu
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={handleMenuClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				{getMenuItems().map((item) => (
					<MenuItem key={item.key} onClick={item.onClick}>
						{item.label}
					</MenuItem>
				))}
			</Menu>

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
