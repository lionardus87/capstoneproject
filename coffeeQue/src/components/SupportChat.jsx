import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Paper,
	Stack,
} from "@mui/material";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";

export default function SupportChat() {
	const { socket } = useSocket();
	const { auth } = useAuth();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (!socket || !auth?.user) return;

		socket.emit("register_user", auth.user.username || "Guest");

		socket.on("receive_message", (msg) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off("receive_message");
		};
	}, [socket, auth]);

	const handleSend = () => {
		if (!input.trim()) return;
		socket.emit("send_message", {
			from: auth?.user?.username || "Guest",
			to: "admin",
			message: input,
		});
		setInput("");
	};

	return (
		<Paper elevation={3} sx={{ p: 2, maxWidth: 400, mx: "auto" }}>
			<Typography variant="h6">Support Chat</Typography>
			<Box
				sx={{
					maxHeight: 300,
					overflowY: "auto",
					mt: 2,
					mb: 1,
					bgcolor: "#f5f5f5",
					p: 1,
					borderRadius: 2,
				}}
			>
				{messages.map((msg, idx) => (
					<Box key={idx} sx={{ my: 1 }}>
						<Typography variant="body2" color="textSecondary">
							<b>{msg.from}</b>: {msg.message}
						</Typography>
					</Box>
				))}
			</Box>
			<Stack direction="row" spacing={1}>
				<TextField
					size="small"
					fullWidth
					variant="outlined"
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
