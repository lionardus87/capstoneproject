import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { useOrders } from "../contexts/OrderContext";
import AdminOrders from "../components/AdminOrders";
import MemberOrders from "../components/MemberOrders";

export default function OrdersPage() {
	const { orders, loading, error, isAdmin } = useOrders();

	if (loading) {
		return (
			<Typography textAlign="center" mt={6} color="text.secondary">
				<CircularProgress size={24} sx={{ mr: 2 }} /> Loading orders...
			</Typography>
		);
	}

	if (error) {
		return (
			<Typography textAlign="center" mt={6} color="error.main">
				{error}
			</Typography>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<Typography textAlign="center" mt={6} color="text.secondary">
				No orders found.
			</Typography>
		);
	}

	return isAdmin ? (
		<AdminOrders orders={orders} />
	) : (
		<MemberOrders orders={orders} />
	);
}
