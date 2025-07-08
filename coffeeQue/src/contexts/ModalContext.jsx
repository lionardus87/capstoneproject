import React, { createContext, useContext, useState } from "react";
import AddProductModal from "../components/modals/AddProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import AddOnModal from "../components/modals/AddOnModal";

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

	const renderModal = () => {
		switch (modalType) {
			case "addModal":
				return (
					<AddProductModal
						open={true}
						onClose={closeModal}
						product={modalProps.product}
						onSave={() => {
							modalProps.refreshProducts?.();
							closeModal();
						}}
						isAdmin={modalProps.isAdmin}
						refreshProducts={modalProps.refreshProducts}
						venueId={modalProps.venueId}
					/>
				);

			case "editModal":
				if (!modalProps.product) return null;
				return (
					<EditProductModal
						open={true}
						onClose={closeModal}
						product={modalProps.product}
						onSave={() => {
							modalProps.refreshProducts?.();
							closeModal();
						}}
						isAdmin={modalProps.isAdmin}
						refreshProducts={modalProps.refreshProducts}
						venueId={modalProps.venueId}
					/>
				);

			case "addon":
				return (
					<AddOnModal
						open={true}
						onClose={closeModal}
						product={modalProps.product}
						onConfirm={modalProps.onConfirm}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<ModalContext.Provider
			value={{ modalType, modalProps, openModal, closeModal }}
		>
			{children}
			{renderModal()}
		</ModalContext.Provider>
	);
};
