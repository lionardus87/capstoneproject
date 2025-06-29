import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
	manageOrders,
	viewOrderStatus,
	changeOrderStatus,
} from "../API/orderAPI";

// Context
const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);

// Reducer
const initialState = {
	orders: [],
	loading: false,
	error: null,
};

function ordersReducer(state, action) {
	switch (action.type) {
		case "startLoading":
			return { ...state, loading: true, error: null };
		case "loadSuccess":
			return { ...state, loading: false, orders: action.payload };
		case "loadError":
			return { ...state, loading: false, error: action.payload, orders: [] };
		case "updateStatus":
			return {
				...state,
				orders: state.orders.map((order) =>
					order._id === action.payload._id ? action.payload : order
				),
			};
		default:
			return state;
	}
}

export const OrdersProvider = ({ children }) => {
	const { auth } = useAuth();
	const isAdmin = auth.user?.role === "admin";
	const userId = auth?.user?._id;
	const venueId = auth?.user?.venueId;

	const [state, dispatch] = useReducer(ordersReducer, initialState);

	// Fetch orders
	useEffect(() => {
		const fetchOrders = async () => {
			if (!auth?.user) return;
			if ((isAdmin && !venueId) || (!isAdmin && !userId)) return;

			dispatch({ type: "startLoading" });

			try {
				const res = isAdmin
					? await manageOrders(venueId)
					: await viewOrderStatus(userId);

				if (res.success) {
					dispatch({ type: "loadSuccess", payload: res.orderProduct });
				} else {
					dispatch({ type: "loadError", payload: res.message });
				}
			} catch (err) {
				dispatch({
					type: "loadError",
					payload: err.message || "Failed to load orders",
				});
			}
		};

		fetchOrders();
	}, [auth.user]);

	const updateOrderStatus = async (orderId, newStatus) => {
		try {
			const res = await changeOrderStatus(orderId, newStatus);
			if (res.success) {
				dispatch({
					type: "updateStatus",
					payload: res.updatedOrder,
				});
			} else {
				console.error("Failed to update order status:", res.message);
			}
		} catch (err) {
			console.error("Error updating order status:", err.message);
		}
	};

	return (
		<OrdersContext.Provider
			value={{
				orders: state.orders,
				loading: state.loading,
				error: state.error,
				isAdmin,
				updateOrderStatus,
			}}
		>
			{children}
		</OrdersContext.Provider>
	);
};
