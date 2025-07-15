import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import { fetchChatMessages } from "../API/messageAPI";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
	const { socket } = useSocket();
	const { auth } = useAuth();
	const [messages, setMessages] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	// Register user on connect
	useEffect(() => {
		if (socket && auth?.user?.username) {
			socket.emit("register_user", auth.user.username);
		}
	}, [socket, auth?.user?.username]);

	// Load history from backend
	useEffect(() => {
		const loadMessages = async () => {
			try {
				const data = await fetchChatMessages();
				setMessages(data);
			} catch (err) {
				console.error("Failed to load chat history", err);
			}
		};
		loadMessages();
	}, []);

	// Receive real-time messages
	useEffect(() => {
		if (!socket) return;

		const handleReceive = (msg) => {
			setMessages((prev) => [...prev, msg]);
		};

		socket.on("receive_message", handleReceive);
		return () => socket.off("receive_message", handleReceive);
	}, [socket]);

	const sendMessage = (to, message) => {
		if (!socket || !auth?.user?.username || !message.trim()) return;

		const msg = {
			from: auth.user.username,
			to,
			message: message.trim(),
		};
		socket.emit("send_message", msg);
		// setMessages((prev) => [...prev, msg]);
		setSelectedUser(to);
	};

	const userList = useMemo(() => {
		return [
			...new Set(
				messages.map((msg) => msg.from).filter((u) => u !== auth?.user?.username)
			),
		];
	}, [messages, auth?.user?.username]);

	useEffect(() => {
		if (userList.length && !selectedUser) {
			setSelectedUser(userList[0]);
		}
	}, [userList, selectedUser]);

	const filteredMessages = useMemo(() => {
		if (!auth?.user?.username || !selectedUser) return [];
		return messages.filter(
			(m) =>
				(m.from === selectedUser && m.to === auth.user.username) ||
				(m.from === auth.user.username && m.to === selectedUser)
		);
	}, [messages, selectedUser, auth?.user?.username]);

	return (
		<ChatContext.Provider
			value={{
				messages,
				filteredMessages,
				sendMessage,
				userList,
				selectedUser,
				setSelectedUser,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
