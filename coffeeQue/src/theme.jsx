import { createTheme } from "@mui/material/styles";

// Custom CoffeeQue theme
const theme = createTheme({
	palette: {
		primary: {
			main: "#435A12", // Army Green
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#7E8E20", // Olive Green
		},
		background: {
			default: "#F7F9F3", // Light background
			paper: "#DCE5D2", // For cards, dialog and modals
			textfield: "whitesmoke",
			secondary: "fff",
		},
		error: {
			main: "#D32F2F",
		},
		warning: {
			main: "#ED6C02",
		},
		info: {
			main: "#0288D1",
		},
		success: {
			main: "#2E7D32",
		},
		text: {
			primary: "#212121",
			secondary: "#435A12",
		},
	},
	typography: {
		fontFamily: "sans-serif",
		h1: {
			fontWeight: 700,
			fontSize: "2.5rem",
		},
		h4: {
			fontWeight: 600,
			fontSize: "1.75rem",
		},
		body1: {
			fontSize: "1rem",
		},
		button: {
			textTransform: "none",
			fontWeight: "bold",
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 20,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: 12,
				},
			},
		},
	},
});

export default theme;
