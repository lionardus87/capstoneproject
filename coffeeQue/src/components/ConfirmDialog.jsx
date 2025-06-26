import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";

export default function ConfirmDialog({
	open,
	title = "Are you sure?",
	description = "",
	onConfirm,
	onCancel,
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmColor = "error", // "primary", "secondary", "error", etc.
}) {
	return (
		<Dialog
			open={open}
			onClose={onCancel}
			aria-labelledby="confirm-dialog-title"
			aria-describedby="confirm-dialog-description"
			fullWidth
			maxWidth="xs"
		>
			<DialogTitle id="confirm-dialog-title" sx={{ fontWeight: "bold" }}>
				{title}
			</DialogTitle>
			<DialogContent>
				<Typography id="confirm-dialog-description">{description}</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onCancel}
					color="inherit"
					variant="outlined"
					sx={{ textTransform: "none" }}
				>
					{cancelText}
				</Button>
				<Button
					onClick={onConfirm}
					color={confirmColor}
					variant="contained"
					sx={{ textTransform: "none" }}
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
