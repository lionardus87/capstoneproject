import { createContext, useEffect, useReducer, useContext } from "react";
import { fetchUserWithToken } from "../API/authAPI";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const initialState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	isLogin: false,
	isLoading: true,
};

function reducer(state, action) {
	switch (action.type) {
		case "signIn": {
			const { user, accessToken, refreshToken } = action.payload;
			if (accessToken) sessionStorage.setItem("accessToken", accessToken);
			if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

			return {
				...state,
				user,
				accessToken,
				refreshToken,
				isLogin: true,
				isLoading: false,
			};
		}
		case "signOut": {
			sessionStorage.removeItem("accessToken");
			sessionStorage.removeItem("refreshToken");
			return { ...initialState };
		}
		case "finishLoading": {
			return { ...state, isLoading: false };
		}
		default:
			return state;
	}
}

export const AuthProvider = ({ children }) => {
	const [auth, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const autoLogin = async () => {
			const accessToken = sessionStorage.getItem("accessToken");
			const refreshToken = sessionStorage.getItem("refreshToken");

			if (accessToken) {
				try {
					const user = await fetchUserWithToken();

					dispatch({
						type: "signIn",
						payload: { user, accessToken, refreshToken },
					});
				} catch (err) {
					console.error("Auto-login failed:", err);
					dispatch({ type: "signOut" });
				}
			} else {
				dispatch({ type: "finishLoading" });
			}
		};
		autoLogin();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, authDispatch: dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
