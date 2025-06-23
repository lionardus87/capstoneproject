import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchAllVenues } from "../API/venueAPI";

export const VenuesContext = createContext();
export const useVenues = () => useContext(VenuesContext);

const initialState = {
	isLoading: true,
	success: false,
	venues: [],
	error: "",
};

function venueReducer(state, action) {
	switch (action.type) {
		case "loadVenues":
			return { ...state, isLoading: true, error: "" };
		case "listVenues":
			return {
				...state,
				isLoading: false,
				success: true,
				venues: action.payload,
			};
		case "error":
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
}

export const VenuesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(venueReducer, initialState);

	const fetchVenues = async () => {
		dispatch({ type: "loadVenues" });
		try {
			const venues = await fetchAllVenues();
			dispatch({ type: "listVenues", payload: venues });
		} catch (error) {
			dispatch({ type: "error", payload: error.message });
		}
	};

	useEffect(() => {
		fetchVenues();
	}, []);

	const getVenueById = (id) => state.venues.find((v) => v._id === id);

	return (
		<VenuesContext.Provider
			value={{ ...state, getVenueById, refreshVenues: fetchVenues }}
		>
			{children}
		</VenuesContext.Provider>
	);
};
