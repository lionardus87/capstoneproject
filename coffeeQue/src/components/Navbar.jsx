import React, { useState, useMemo } from "react";
import {
	AppBar,
	Toolbar,
	Stack,
	ButtonBase,
	Box,
	Menu,
	MenuItem,
	IconButton,
	Typography,
	Button,
	Badge,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";

import logo from "../assets/CQ.png";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/ShoppingCartContext";
import { useModal } from "../contexts/ModalContext";
import { useSnackbar } from "../contexts/SnackBarContext";

import LoginModal from "./modals/LoginModal";
import ShoppingCartModal from "./modals/ShoppingCartModal";

export default function Navbar() {
	const navigate = useNavigate();
	const theme = useTheme();

	const { auth, authDispatch } = useAuth();
	const { cartItems } = useCart();
	const { openModal, modal, closeModal } = useModal();
	const { showSnackbar } = useSnackbar();

	const isAdmin = auth?.user?.role === "admin";
	const isMember = auth?.user?.role === "member";

	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const totalQty = useMemo(
		() =>
			cartItems.reduce(
				(sum, venue) =>
					sum + venue.items.reduce((vsum, item) => vsum + item.qty, 0),
				0
			),
		[cartItems]
	);

	const handleLogout = () => {
		authDispatch({ type: "signOut" });
		handleMenuClose();
		showSnackbar("Logout successful", "success");
		navigate("/");
	};

	const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);
	const handleNavigate = (path) => {
		navigate(path);
		handleMenuClose();
	};

	const getMenuItems = () => {
		if (!auth.isLogin) return [];

		const items = [];

		if (isAdmin && auth.user?.venueId) {
			items.push(
				{
					key: "menu",
					label: "Menu",
					onClick: () =>
						handleNavigate(`/admin/venues/${auth.user.venueId}/products`),
				},
				{
					key: "manage",
					label: "Manage Order",
					onClick: () => handleNavigate(`/admin/venues/${auth.user.venueId}/orders`),
				},
				{
					key: "review",
					label: "Leave a Review",
					onClick: () => handleNavigate(`/review`),
				}
			);
		}

		if (isMember) {
			items.push(
				{
					key: "orders",
					label: "Order Now",
					onClick: () => handleNavigate("/venues"),
				},
				{
					key: "status",
					label: "Order Status",
					onClick: () => handleNavigate(`/member/${auth.user._id}/orders`),
				},
				{
					key: "register-venue",
					label: "Register Venue",
					onClick: () => handleNavigate(`/register-venue`),
				},
				{
					key: "review",
					label: "Leave a Review",
					onClick: () => handleNavigate(`/review`),
				}
			);
		}

		if (isAdmin && auth.user.username === "admin") {
			items.push({
				key: "support",
				label: "Support Chat",
				onClick: () => handleNavigate(`/admin/support`),
			});
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
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.primary.main,
					py: 1.5,
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
						{isMember && (
							<IconButton
								onClick={() => openModal("shoppingCart")}
								sx={{ color: theme.palette.primary.main }}
							>
								<Badge
									badgeContent={totalQty > 0 ? totalQty : null}
									color="error"
									overlap="rectangular"
									showZero={false}
								>
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						)}

						{auth.isLogin ? (
							<>
								<IconButton
									onClick={handleMenuClick}
									sx={{ color: theme.palette.primary.main }}
									size="large"
								>
									<AccountCircleIcon fontSize="large" />
								</IconButton>
								<Typography
									onClick={handleMenuClick}
									sx={{
										cursor: "pointer",
										fontWeight: "bold",
										color: theme.palette.primary.main,
									}}
								>
									{auth.user?.username || "User"}
								</Typography>
							</>
						) : (
							<Button
								startIcon={<AccountCircleIcon />}
								onClick={() => openModal("login")}
								sx={{
									backgroundColor: theme.palette.common.white,
									color: theme.palette.primary.main,
									borderRadius: "20px",
									textTransform: "none",
									px: 2,
									fontWeight: "bold",
									"&:hover": {
										backgroundColor: theme.palette.primary.dark,
										color: theme.palette.primary.contrastText,
									},
								}}
							>
								Login
							</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>

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

			<LoginModal open={modal === "login"} onClose={closeModal} />
			<ShoppingCartModal open={modal === "shoppingCart"} onClose={closeModal} />
		</>
	);
}
