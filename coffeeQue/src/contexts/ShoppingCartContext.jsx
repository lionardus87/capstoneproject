import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCart": {
			const existing = state.find((item) => item._id === action.item._id);
			if (existing) {
				return state.map((item) =>
					item._id === action.item._id
						? { ...item, qty: item.qty + (action.item.qty || 1) }
						: item
				);
			}
			return [...state, { ...action.item, qty: action.item.qty || 1 }];
		}
		case "updateQty": {
			return state.map((item) =>
				item._id === action._id ? { ...item, qty: action.qty } : item
			);
		}
		case "removeFromCart": {
			return state.filter((item) => item._id !== action._id);
		}
		case "clearCart": {
			return [];
		}
		default:
			return state;
	}
};

const getInitialCart = (username) => {
	try {
		const stored = localStorage.getItem(`coffeeque_cart_${username}`);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Error loading cart from localStorage:", error);
		return [];
	}
};

export const CartProvider = ({ children }) => {
	const { auth } = useAuth();
	const username = auth?.user?.username;
	const prevUsername = useRef(username);

	const [cartItems, dispatch] = useReducer(
		cartReducer,
		username ? getInitialCart(username) : []
	);

	// Save cart to localStorage
	useEffect(() => {
		if (username) {
			localStorage.setItem(
				`coffeeque_cart_${username}`,
				JSON.stringify(cartItems)
			);
		}
	}, [cartItems, username]);

	// Clear cart when user logs out
	useEffect(() => {
		if (prevUsername.current && !username) {
			localStorage.removeItem(`coffeeque_cart_${prevUsername.current}`);
			dispatch({ type: "clearCart" });
		}
		prevUsername.current = username;
	}, [username]);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart: (item) => dispatch({ type: "addToCart", item }),
				removeFromCart: (_id) => dispatch({ type: "removeFromCart", _id }),
				clearCart: () => dispatch({ type: "clearCart" }),
				updateQty: (_id, qty) => dispatch({ type: "updateQty", _id, qty }),
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
