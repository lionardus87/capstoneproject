import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/LoginModal";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
}
