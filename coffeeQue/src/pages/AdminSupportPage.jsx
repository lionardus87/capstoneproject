import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AdminChatPanel from "../components/AdminChatPanel";

export default function AdminSupportPage() {
	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Admin Support Panel
			</Typography>
			<Box sx={{ mt: 2 }}>
				<AdminChatPanel />
			</Box>
		</Container>
	);
}
