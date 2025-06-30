// import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "./contexts/SnackBarContext";
import AppRouter from "./routes/AppRouter";
import { ModalProvider } from "./contexts/ModalContext";
import GlobalModals from "./components/GlobalModal";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider>
				<ModalProvider>
					<AppRouter />
					<GlobalModals />
				</ModalProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
