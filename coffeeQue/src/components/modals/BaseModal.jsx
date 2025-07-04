import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	useTheme,
	Box,
} from "@mui/material";

export default function BaseModal({
	open,
	onClose,
	title,
	children,
	actions,
	maxWidth = "sm",
	fullWidth = true,
}) {
	const theme = useTheme();

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			disableScrollLock
		>
			<DialogTitle
				sx={{
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.primary.main,
					fontWeight: "bold",
					textAlign: "center",
					px: 4,
					py: 3,
				}}
			>
				{title}
			</DialogTitle>

			<DialogContent
				sx={{
					backgroundColor: theme.palette.background.paper,
					px: 4,
					pt: 2,
					pb: 3,
				}}
			>
				{children}
			</DialogContent>

			<DialogActions
				sx={{
					backgroundColor: theme.palette.background.paper,
					justifyContent: "center",
					px: 4,
					py: 2,
				}}
			>
				{actions}
			</DialogActions>
		</Dialog>
	);
}
