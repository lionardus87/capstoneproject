import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
	const { auth } = useContext(AuthContext);
	if (auth.isLoading) {
		return (
			<div
				style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
			>
				<p>Loading...</p>
			</div>
		);
	}
	if (!auth.isLogin) return <Navigate to="/" replace />;
	if (!allowedRoles.includes(auth.user?.role)) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <Outlet />;
}
