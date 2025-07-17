import React from "react";
import { AuthProvider } from "./AuthContext.jsx";
import { VenuesProvider } from "./VenuesContext.jsx";
import { ProductsProvider } from "./ProductsContext.jsx";
import { CartProvider } from "./ShoppingCartContext.jsx";
import { OrdersProvider } from "./OrderContext.jsx";
import { SocketProvider } from "./SocketContext.jsx";
import { ChatProvider } from "./ChatContext.jsx";
import { SnackbarProvider } from "./SnackBarContext.jsx";
import { ModalProvider } from "./ModalContext.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "../theme.jsx";

// Add other providers here as needed

const AppProviders = ({ children }) => {
	return (
		<VenuesProvider>
			<AuthProvider>
				<OrdersProvider>
					<ProductsProvider>
						<CartProvider>
							<SocketProvider>
								<ChatProvider>
									<ThemeProvider theme={theme}>
										<SnackbarProvider>
											<ModalProvider>{children}</ModalProvider>
										</SnackbarProvider>
									</ThemeProvider>
								</ChatProvider>
							</SocketProvider>
						</CartProvider>
					</ProductsProvider>
				</OrdersProvider>
			</AuthProvider>
		</VenuesProvider>
	);
};

export default AppProviders;
