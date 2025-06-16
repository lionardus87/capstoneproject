import { useState, useCallback } from "react";

export default function useSnackbar() {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "info", // info | success | error | warning
	});

	const showSnackbar = useCallback((message, severity = "info") => {
		setSnackbar({ open: true, message, severity });
	}, []);

	const handleClose = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return { snackbar, showSnackbar, handleClose };
}
