import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [modalType, setModalType] = useState(null);
	const [modalProps, setModalProps] = useState({});

	const openModal = (type, props = {}) => {
		setModalType(type);
		setModalProps(props);
	};

	const closeModal = () => {
		setModalType(null);
		setModalProps({});
	};

	return (
		<ModalContext.Provider
			value={{ modalType, modalProps, openModal, closeModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};
