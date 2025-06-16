import { createContext, useEffect, useReducer } from "react";
import { loginRequest } from "../API/authAPI";

export const AuthContext = createContext();

const initialState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	isLogin: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "signIn": {
			const { user, accessToken, refreshToken } = action.payload;
			if (accessToken) sessionStorage.setItem("accessToken", accessToken);
			if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);
			return { ...state, user, accessToken, refreshToken, isLogin: true };
		}
		case "signOut": {
			sessionStorage.removeItem("accessToken");
			sessionStorage.removeItem("refreshToken");
			return { ...initialState };
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
			if (accessToken) {
				try {
					const user = await loginRequest();
					dispatch({ type: "signIn", payload: { user, accessToken } });
				} catch (err) {
					console.error("Auto-login failed:", err);
					dispatch({ type: "signOut" });
				}
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
