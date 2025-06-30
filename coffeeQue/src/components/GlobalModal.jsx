import { useModal } from "../contexts/ModalContext";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import EditProductModal from "./modals/EditProductModal";
import AddProductModal from "./modals/AddProductModal";
import ShoppingCartModal from "./modals/ShoppingCartModal";

export default function GlobalModals() {
	const { modalType, modalProps, closeModal } = useModal();

	switch (modalType) {
		case "login":
			return <LoginModal open onClose={closeModal} {...modalProps} />;
		case "signup":
			return <SignupModal open onClose={closeModal} {...modalProps} />;
		case "editProduct":
			return <EditProductModal open onClose={closeModal} {...modalProps} />;
		case "addProduct":
			return <AddProductModal open onClose={closeModal} {...modalProps} />;
		case "shoppingCart":
			return <ShoppingCartModal open onClose={closeModal} {...modalProps} />;
		default:
			return null;
	}
}
