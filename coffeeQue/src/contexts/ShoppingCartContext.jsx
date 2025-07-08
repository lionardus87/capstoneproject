import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from "react";
import { useAuth } from "./AuthContext";
import { useVenues } from "./VenuesContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCart": {
			const { item, venueId, venueName } = action;
			// Check if this venue already exists
			const existingVenue = state.find((v) => v.venueId === venueId);

			const serializeAddons = (addons) =>
				Array.isArray(addons)
					? addons
							.map((a) => `${a.label}:${a.price || 0}`)
							.sort()
							.join("|")
					: "";

			if (existingVenue) {
				const existingItem = existingVenue.items.find(
					(i) =>
						i._id === item._id &&
						serializeAddons(i.addons) === serializeAddons(item.addons)
				);
				// Item exists → update quantity
				if (existingItem) {
					return state.map((v) =>
						v.venueId === venueId
							? {
									...v,
									items: v.items.map((i) =>
										i._id === item._id &&
										serializeAddons(i.addons) === serializeAddons(item.addons)
											? { ...i, qty: i.qty + (item.qty || 1) }
											: i
									),
							  }
							: v
					);
				}

				// Item doesn't exist → add to items
				return state.map((v) =>
					v.venueId === venueId
						? { ...v, items: [...v.items, { ...item, qty: item.qty || 1 }] }
						: v
				);
			}

			// Venue doesn't exist yet → add new group with venueName
			return [
				...state,
				{
					venueId,
					venueName,
					items: [{ ...item, qty: item.qty || 1 }],
				},
			];
		}

		case "updateQty": {
			const { venueId, _id, qty } = action;
			return state.map((v) =>
				v.venueId === venueId
					? {
							...v,
							items: v.items.map((i) => (i._id === _id ? { ...i, qty } : i)),
					  }
					: v
			);
		}
		case "removeFromCart": {
			const { venueId, _id } = action;
			return state
				.map((v) =>
					v.venueId === venueId
						? { ...v, items: v.items.filter((i) => i._id !== _id) }
						: v
				)
				.filter((v) => v.items.length > 0);
		}
		case "replaceCart":
			return action.items || [];
		case "clearCart":
			return [];
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const { auth } = useAuth();
	const username = auth?.user?.username;
	const hasLoadedCart = useRef(false);
	const { getVenueById, isLoading: venuesLoading } = useVenues();

	const [cartItems, dispatch] = useReducer(cartReducer, []);

	const getInitialCart = (username) => {
		try {
			const stored = localStorage.getItem(`coffeeque_cart_${username}`);
			const parsed = stored ? JSON.parse(stored) : [];

			return parsed.map((entry) => {
				const fixedItems = entry.items.map((item) => ({
					...item,
					addons: Array.isArray(item.addons) ? item.addons : [],
				}));

				if (!entry.venueId && fixedItems[0]?.venue) {
					const venueId = fixedItems[0].venue;
					const venueName = getVenueById(venueId)?.venueName || "Unknown Venue";
					return { ...entry, venueId, venueName, items: fixedItems };
				}

				return { ...entry, items: fixedItems };
			});
		} catch (error) {
			console.error("Error loading cart from localStorage:", error);
			return [];
		}
	};

	useEffect(() => {
		if (username && !venuesLoading && !hasLoadedCart.current) {
			const stored = getInitialCart(username);
			dispatch({ type: "replaceCart", items: stored });
			hasLoadedCart.current = true;
		}
	}, [username, venuesLoading]);

	useEffect(() => {
		if (username && hasLoadedCart.current) {
			localStorage.setItem(
				`coffeeque_cart_${username}`,
				JSON.stringify(cartItems)
			);
		}
	}, [cartItems, username]);

	const addToCart = (item) => {
		const venueId = item.venue;
		const venueName = getVenueById(venueId)?.venueName || "Unknown Venue";
		dispatch({
			type: "addToCart",
			item: { ...item, addons: Array.isArray(item.addons) ? item.addons : [] },
			venueId,
			venueName,
		});
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart: (venueId, _id) =>
					dispatch({ type: "removeFromCart", venueId, _id }),
				clearCart: () => dispatch({ type: "clearCart" }),
				updateQty: (venueId, _id, qty) =>
					dispatch({ type: "updateQty", venueId, _id, qty }),
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
