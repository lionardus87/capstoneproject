import React, { useState, useContext } from "react";
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
import { AuthContext } from "../contexts/AuthContext";
import { loginRequest } from "../API/authAPI";
import useSnackbar from "../hooks/useSnackbar";

export default function Navbar() {
	const [signin, setSignin] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const { auth, authDispatch } = useContext(AuthContext);
	const { snackbar, showSnackbar, handleClose } = useSnackbar();

	const isMenuOpen = Boolean(anchorEl);

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
				{auth.isLogin &&
					auth.userRole === "admin" && [
						<MenuItem key="list" onClick={() => handleNavigate("/menu-list")}>
							Menu
						</MenuItem>,
						<MenuItem key="add" onClick={() => handleNavigate("/add-menu")}>
							Add Menu
						</MenuItem>,
						<MenuItem key="logout" onClick={handleLogout}>
							Logout
						</MenuItem>,
					]}

				{auth.isLogin &&
					auth.userRole === "member" && [
						<MenuItem key="orders" onClick={() => handleNavigate("/order-now")}>
							Order Now
						</MenuItem>,
						<MenuItem key="status" onClick={() => handleNavigate("/order-status")}>
							Order Status
						</MenuItem>,
						<MenuItem key="logout" onClick={handleLogout}>
							Logout
						</MenuItem>,
					]}
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
