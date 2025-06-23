import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { VenuesProvider } from "./contexts/VenuesContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
	<VenuesProvider>
		<AuthProvider>
			<ProductsProvider>
				<App />
			</ProductsProvider>
		</AuthProvider>
	</VenuesProvider>
);
