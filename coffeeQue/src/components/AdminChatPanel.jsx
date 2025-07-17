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
	Container,
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
		if (input.trim() && selectedUser?._id) {
			sendMessage(selectedUser._id, input);
			setInput("");
		}
	};

	return (
		<Paper elevation={4} sx={{ p: 2, width: "100%", maxWidth: 800 }}>
			<Typography variant="h6">Support Chat Panel</Typography>

			<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
				{/* Sidebar */}
				<List
					sx={{ width: 200, color: "text.secondary", borderRight: "1px solid #ccc" }}
				>
					{userList.map((user) => {
						const isSelected = selectedUser?._id === user._id;
						return (
							<ListItem
								button="true"
								key={user._id}
								onClick={() => setSelectedUser(user)}
								sx={{
									bgcolor: isSelected ? "action.selected" : "transparent",
								}}
							>
								<ListItemText
									primary={user.username || user._id}
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
							bgcolor: "background.default",
							borderRadius: 1,
						}}
					>
						{filteredMessages.length === 0 ? (
							<Typography variant="body2" color="text.secondary" textAlign="center">
								No messages with {selectedUser?.username || selectedUser?._id || "user"}
							</Typography>
						) : (
							filteredMessages.map((msg, idx) => {
								const isAdmin = msg.from === auth.user._id;
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
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSend();
								}
							}}
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
