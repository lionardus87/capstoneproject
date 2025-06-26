// import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "./contexts/SnackBarContext";
import AppRouter from "./routes/AppRouter";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider>
				<AppRouter />
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
