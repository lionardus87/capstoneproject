import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socketIo = io("http://localhost:3003");
		setSocket(socketIo);

		return () => {
			socketIo.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
	);
};
