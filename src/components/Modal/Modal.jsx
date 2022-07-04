import { useRef } from "react";
import "./Modal.css";

export default function Modal({ children, showModal, setShowModal }) {
	const modalRef = useRef();

	const closeModal = (e) => {
		if (e.target === modalRef.current) {
			setShowModal(false);
		}
	};

	return (
		showModal && (
			<div className="modal" ref={modalRef} onClick={closeModal}>
				<div className="container">{children}</div>
			</div>
		)
	);
}
