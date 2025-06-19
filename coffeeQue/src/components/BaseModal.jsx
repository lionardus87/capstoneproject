import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Snackbar,
	Alert,
} from "@mui/material";

export default function BaseModal({
	open,
	onClose,
	title,
	children,
	actions,
	snackbar, // { open, message, severity }
	onSnackbarClose,
}) {
	return (
		<>
			<Dialog open={open} onClose={onClose} disableScrollLock>
				<DialogTitle
					sx={{
						backgroundColor: "#F7F9F3",
						color: "#435A12",
						textAlign: "center",
						fontWeight: "bold",
						p: 3,
					}}
				>
					{title}
				</DialogTitle>

				<DialogContent sx={{ backgroundColor: "#F7F9F3", px: 8, pt: 3 }}>
					{children}
				</DialogContent>

				<DialogActions
					sx={{
						backgroundColor: "#F7F9F3",
						justifyContent: "space-between",
						px: 3,
						pb: 2,
					}}
				>
					{actions}
				</DialogActions>
			</Dialog>

			{/* Snackbar Toast Alert */}
			<Snackbar
				open={snackbar?.open || false}
				autoHideDuration={4000}
				onClose={onSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={onSnackbarClose}
					severity={snackbar?.severity || "info"}
					sx={{ width: "100%" }}
				>
					{snackbar?.message || ""}
				</Alert>
			</Snackbar>
		</>
	);
}
