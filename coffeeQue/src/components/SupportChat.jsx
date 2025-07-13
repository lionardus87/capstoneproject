import React, { useState, useRef, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Paper,
	Stack,
} from "@mui/material";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";

export default function SupportChat() {
	const { sendMessage, filteredMessages } = useChat();
	const { auth } = useAuth();
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);

	const handleSend = () => {
		if (!input.trim()) return;
		sendMessage("admin", input);
		setInput("");
	};

	// Scroll to bottom on new messages
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
		}
	}, [filteredMessages]);

	return (
		<Paper elevation={3} sx={{ p: 2, maxWidth: 400 }}>
			<Typography variant="h6">Support Chat</Typography>

			<Box
				ref={messagesEndRef}
				sx={{
					maxHeight: 300,
					overflowY: "auto",
					my: 2,
					p: 1,
					bgcolor: "background.default",
					borderRadius: 2,
				}}
			>
				{filteredMessages.length === 0 ? (
					<Typography variant="body2" color="text.secondary" align="center">
						No messages yet
					</Typography>
				) : (
					filteredMessages.map((msg, idx) => {
						const isUser = msg.from === (auth?.user?.username || "Guest");
						return (
							<Box key={idx} sx={{ my: 1 }}>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ textAlign: isUser ? "right" : "left", display: "block" }}
								>
									{msg.from}
								</Typography>
								<Box sx={{ textAlign: isUser ? "right" : "left" }}>
									<Typography
										variant="body2"
										sx={{
											display: "inline-block",
											px: 1.5,
											py: 1,
											bgcolor: isUser ? "#c8e6c9" : "#eeeeee",
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

			<Stack direction="row" spacing={1}>
				<TextField
					size="small"
					fullWidth
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your message..."
				/>
				<Button variant="contained" onClick={handleSend}>
					Send
				</Button>
			</Stack>
		</Paper>
	);
}
