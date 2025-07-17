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
			socket.emit("register_user", auth.user._id);
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
			console.log("Received message:", msg);
			setMessages((prev) => [...prev, msg]);
		};

		socket.on("receive_message", handleReceive);
		return () => socket.off("receive_message", handleReceive);
	}, [socket]);

	const sendMessage = (to, message) => {
		if (!socket || !auth?.user?.username || !message.trim()) return;

		const msg = {
			from: auth.user._id,
			fromUsername: auth.user.username,
			to,
			message: message.trim(),
		};
		socket.emit("send_message", msg);
		const userObj = userList.find((u) => u._id === to);
		if (userObj) {
			setSelectedUser(userObj);
		}
	};

	const userList = useMemo(() => {
		const rawUsers = messages
			.map((msg) =>
				msg.from !== auth?.user?._id
					? { _id: msg.from, username: msg.fromUsername || msg.from }
					: msg.to !== auth?.user?._id
					? { _id: msg.to, username: msg.toUsername || msg.to }
					: null
			)
			.filter(Boolean);

		const uniqueUsers = [
			...new Map(rawUsers.map((user) => [user._id, user])).values(),
		];
		return uniqueUsers;
	}, [messages, auth?.user?._id]);

	useEffect(() => {
		if (userList.length && !selectedUser) {
			setSelectedUser(userList[0]);
		}
	}, [userList, selectedUser]);

	const filteredMessages = useMemo(() => {
		if (!auth?.user?._id || !selectedUser?._id) return [];
		return messages.filter(
			(m) =>
				(m.from === selectedUser._id && m.to === auth.user._id) ||
				(m.from === auth.user._id && m.to === selectedUser._id)
		);
	}, [messages, selectedUser, auth?.user?._id]);

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
