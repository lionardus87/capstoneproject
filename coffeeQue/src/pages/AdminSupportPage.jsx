import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AdminChatPanel from "../components/AdminChatPanel";
import { useTheme } from "@mui/material/styles";

export default function AdminSupportPage() {
	const theme = useTheme();

	return (
		<Box sx={{ bgcolor: theme.palette.background.default, minHeight: "80vh" }}>
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Typography variant="h4" color="text.secondary" gutterBottom>
					Admin Support Panel
				</Typography>
				<Box sx={{ mt: 2 }}>
					<AdminChatPanel />
				</Box>
			</Container>
		</Box>
	);
}
