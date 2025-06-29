import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import RegisterVenuePage from "../pages/RegisterVenuePage";
import ProductListPage from "../pages/ProductListPage";
import ProtectedRoute from "./ProtectedRouter";
import VenuesListPage from "../pages/VenuesListPage";
import OrdersPage from "../pages/OrdersPage";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/register-venue" element={<RegisterVenuePage />} />
				<Route path="/venues" element={<VenuesListPage />} />
				<Route path="/venues/:venueId/products" element={<ProductListPage />} />
				<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
					<Route
						path="/admin/venues/:venueId/products"
						element={<ProductListPage />}
					/>
					<Route path="/orders" element={<OrdersPage />} />
				</Route>
				<Route element={<ProtectedRoute allowedRoles={["member"]} />}>
					<Route path="/venues" element={<VenuesListPage />} />
					<Route path="/orders" element={<OrdersPage />} />
				</Route>
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
}
