import { createContext, useContext, useEffect, useReducer } from "react";
import {
	fetchAllPublicProducts,
	fetchAdminVenueProducts,
} from "../API/productAPI";
import { useAuth } from "./AuthContext";

export const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

const initialState = {
	isLoading: true,
	products: [],
	error: "",
};

function productReducer(state, action) {
	switch (action.type) {
		case "startLoading":
			return { ...state, isLoading: true, error: "" };
		case "listProducts":
			return { ...state, isLoading: false, products: action.payload };
		case "error":
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
}

export const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productReducer, initialState);
	const { auth } = useAuth();

	const fetchProducts = async (externalVenueId) => {
		dispatch({ type: "startLoading" });

		try {
			let response;

			if (
				auth?.isLogin &&
				auth.user?.role === "admin" &&
				auth.user.venueId &&
				!externalVenueId
			) {
				// Admin: use own venue ID from auth
				response = await fetchAdminVenueProducts(auth.user.venueId);
			} else if (externalVenueId) {
				// Public fetch: for guests/members viewing any venue
				response = await fetchAllPublicProducts(externalVenueId);
			} else {
				throw new Error("Venue ID is required to fetch products.");
			}

			dispatch({ type: "listProducts", payload: response.data });
		} catch (err) {
			dispatch({
				type: "error",
				payload: err?.response?.data?.message || err.message,
			});
		}
	};

	useEffect(() => {
		if (auth.isLoading) return;
		if (auth.isLogin && auth.user?.role === "admin") {
			fetchProducts();
		}
	}, [auth.isLoading, auth.isLogin, auth.user?.venueId]);

	const getProductById = (id) => state.products.find((p) => p._id === id);

	return (
		<ProductsContext.Provider
			value={{ ...state, getProductById, refreshProducts: fetchProducts }}
		>
			{children}
		</ProductsContext.Provider>
	);
};
