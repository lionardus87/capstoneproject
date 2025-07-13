// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#435A12", // Army Green
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#7E8E20", // Olive Green
			contrastText: "#fff",
		},
		background: {
			default: "#F7F9F3", // Light background
			paper: "#DCE5D2", // For cards, dialog and modals
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
			contrastText: "#fff",
		},
	},

	typography: {
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		h1: {
			fontFamily: "'Playfair Display', serif",
			fontWeight: 700,
			fontSize: "2.5rem",
		},
		h4: {
			fontFamily: "'Playfair Display', serif",
			fontWeight: 600,
			fontSize: "1.75rem",
		},
		h6: {
			fontFamily: "'Playfair Display', serif",
			fontWeight: 600,
			fontSize: "1.3rem",
		},
		body1: {
			fontFamily: "Arial",
			fontSize: "1rem",
		},
		body2: {
			fontFamily: "Arial",
			fontSize: "0.8rem",
		},
		button: {
			textTransform: "none",
			fontWeight: 600,
		},
	},

	shape: {
		borderRadius: 4,
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 20,
					fontWeight: 600,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: 12,
				},
				root: {
					backgroundColor: "#DCE5D2",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: "whitesmoke",
					borderRadius: 4,
					fontFamily: "Helvetica",
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: "whitesmoke",
					borderRadius: 4,
					fontFamily: "Helvetica",
				},
			},
		},
	},
});

export default theme;
