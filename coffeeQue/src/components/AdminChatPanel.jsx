import React, { useEffect, useState, useMemo } from "react";
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
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

export default function AdminChatPanel() {
	const { auth } = useAuth();
	const { socket } = useSocket();

	const [messages, setMessages] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (!socket || !auth?.user?.username) return;

		console.log("Registering admin socket:", auth.user.username);
		socket.emit("register_user", auth.user.username);
	}, [socket, auth?.user?.username]);

	useEffect(() => {
		if (!socket) return;

		socket.on("receive_message", (msg) => {
			console.log("Received message:", msg);
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off("receive_message");
		};
	}, [socket]);

	// Build user list from messages (all senders except admin itself)
	const userList = useMemo(() => {
		return [
			...new Set(
				messages.map((msg) => msg.from).filter((u) => u !== auth?.user?.username)
			),
		];
	}, [messages, auth?.user?.username]);

	useEffect(() => {
		if (userList.length > 0 && !selectedUser) {
			setSelectedUser(userList[0]);
		}
	}, [userList, selectedUser]);

	console.log("User list:", userList);
	console.log("Selected user:", selectedUser);

	const handleSend = () => {
		if (!input.trim()) {
			console.log("Empty input, not sending");
			return;
		}
		if (!selectedUser) {
			console.log("No user selected, cannot send");
			return;
		}

		const msg = {
			from: auth.user.username,
			to: selectedUser,
			message: input.trim(),
		};

		console.log("Sending message:", msg);
		socket.emit("send_message", msg);
		// setMessages((prev) => [...prev, { ...msg, time: new Date().toISOString() }]);
		setInput("");
	};

	return (
		<Paper elevation={4} sx={{ p: 2, width: "100%", maxWidth: 600 }}>
			<Typography variant="h6" gutterBottom>
				Support Chat Panel
			</Typography>

			<Box sx={{ mb: 1 }}>
				<Typography>
					Selected User: <strong>{selectedUser || "None"}</strong>
				</Typography>
				{/* Debug button to select a user */}
				{userList.length === 0 && (
					<Button
						onClick={() => setSelectedUser("user3")}
						variant="outlined"
						size="small"
						sx={{ mt: 1 }}
					>
						Select user3 (debug)
					</Button>
				)}
			</Box>

			<Box sx={{ display: "flex", gap: 2 }}>
				{/* User List */}
				<List sx={{ width: 150, borderRight: "1px solid #ccc" }}>
					{userList.map((user) => (
						<ListItem
							button
							key={user}
							selected={selectedUser === user}
							onClick={() => setSelectedUser(user)}
						>
							<ListItemText primary={user} />
						</ListItem>
					))}
				</List>

				{/* Message Window */}
				<Box sx={{ flex: 1 }}>
					<Box sx={{ height: 300, overflowY: "auto", mb: 2, px: 1 }}>
						{messages.filter(
							(m) =>
								(m.from === selectedUser && m.to === auth.user.username) ||
								(m.from === auth.user.username && m.to === selectedUser)
						).length === 0 ? (
							<Typography variant="body2" color="text.secondary" textAlign="center">
								No messages yet with {selectedUser}
							</Typography>
						) : (
							messages
								.filter(
									(m) =>
										(m.from === selectedUser && m.to === auth.user.username) ||
										(m.from === auth.user.username && m.to === selectedUser)
								)
								.map((msg, idx) => (
									<Box
										key={idx}
										sx={{
											textAlign: msg.from === auth.user.username ? "right" : "left",
											my: 0.5,
										}}
									>
										<Typography
											variant="body2"
											sx={{
												display: "inline-block",
												p: 1,
												borderRadius: 1,
												backgroundColor:
													msg.from === auth.user.username ? "#c8e6c9" : "#eeeeee",
											}}
										>
											{msg.message}
										</Typography>
									</Box>
								))
						)}
					</Box>

					{/* Input */}
					<Box sx={{ display: "flex", gap: 1 }}>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							placeholder="Type a reply..."
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
