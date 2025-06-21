import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import RegisterVenuePage from "../pages/RegisterVenuePage";
import RegisterMenuPage from "../pages/AddMenuItem";
import AddMenuItemPage from "../pages/AddMenuItem";
import MenuListPage from "../pages/MenuListPage";
import OrderNowPage from "../pages/OrderNowPage";
import OrderStatusPage from "../pages/OrderStatusPage";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/venue" element={<RegisterVenuePage />} />
				<Route path="/add-menu" element={<AddMenuItemPage />} />
				<Route path="/menu-list" element={<MenuListPage />} />
				<Route path="/order-now" element={<OrderNowPage />} />
				<Route path="/order-status" element={<OrderStatusPage />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
}
