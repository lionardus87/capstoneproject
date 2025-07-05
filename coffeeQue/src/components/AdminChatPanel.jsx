import React, { useRef, useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Paper,
} from "@mui/material";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";

export default function AdminChatPanel() {
	const {
		userList,
		selectedUser,
		setSelectedUser,
		filteredMessages,
		sendMessage,
	} = useChat();
	const { auth } = useAuth();
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
		}
	}, [filteredMessages]);

	const handleSend = () => {
		if (input.trim() && selectedUser) {
			sendMessage(selectedUser, input);
			setInput("");
		}
	};

	return (
		<Paper elevation={4} sx={{ p: 2, width: "100%", maxWidth: 600 }}>
			<Typography variant="h6">Support Chat Panel</Typography>

			<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
				{/* Sidebar */}
				<List sx={{ width: 180, borderRight: "1px solid #ccc" }}>
					{userList.map((user) => {
						const isSelected = selectedUser === user;
						return (
							<ListItem
								button
								key={user}
								onClick={() => setSelectedUser(user)}
								sx={{
									bgcolor: isSelected ? "action.selected" : "transparent",
								}}
							>
								<ListItemText
									primary={user}
									primaryTypographyProps={{
										sx: {
											fontWeight: isSelected ? "bold" : "normal",
										},
									}}
								/>
							</ListItem>
						);
					})}
				</List>

				{/* Chat Body */}
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<Box
						ref={messagesEndRef}
						sx={{
							height: 300,
							overflowY: "auto",
							px: 1,
							mb: 2,
							bgcolor: "#f9f9f9",
							borderRadius: 1,
						}}
					>
						{filteredMessages.length === 0 ? (
							<Typography variant="body2" color="text.secondary" textAlign="center">
								No messages with {selectedUser}
							</Typography>
						) : (
							filteredMessages.map((msg, idx) => {
								const isAdmin = msg.from === auth.user.username;
								return (
									<Box key={idx} sx={{ textAlign: isAdmin ? "right" : "left", my: 0.5 }}>
										<Typography variant="caption" color="text.secondary">
											{new Date(msg.time).toLocaleString()}
										</Typography>
										<Box>
											<Typography
												variant="body2"
												sx={{
													display: "inline-block",
													p: 1,
													bgcolor: isAdmin ? "#c8e6c9" : "#eeeeee",
													borderRadius: 1,
												}}
											>
												{msg.message}
											</Typography>
										</Box>
									</Box>
								);
							})
						)}
					</Box>

					<Box sx={{ display: "flex", gap: 1 }}>
						<TextField
							fullWidth
							size="small"
							placeholder="Type a message..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<Button variant="contained" onClick={handleSend}>
							Send
						</Button>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}
