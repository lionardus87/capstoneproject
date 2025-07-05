import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { VenuesProvider } from "./contexts/VenuesContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { CartProvider } from "./contexts/ShoppingCartContext.jsx";
import { OrdersProvider } from "./contexts/OrderContext.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";
import { ChatProvider } from "./contexts/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
	<VenuesProvider>
		<AuthProvider>
			<OrdersProvider>
				<ProductsProvider>
					<CartProvider>
						<SocketProvider>
							<ChatProvider>
								<App />
							</ChatProvider>
						</SocketProvider>
					</CartProvider>
				</ProductsProvider>
			</OrdersProvider>
		</AuthProvider>
	</VenuesProvider>
);
