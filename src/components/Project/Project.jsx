import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import "./Project.css";
import Modal from "../Modal/Modal";
import RenameProject from "../RenameProject/RenameProject";
import { useState } from "react";

export default function Project({ project, edit }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="project">
			<div className="name">{project.name}</div>
			<div className="btns">
				{edit ? (
					<div className="edit-delete">
						<span className="edit" onClick={() => setShowModal(true)}>
							<EditOutlinedIcon size="13" />
						</span>
						<span className="delete">
							<DoDisturbOnOutlinedIcon size="13" />
						</span>
					</div>
				) : project.numOfTodos === 0 ? (
					""
				) : (
					<div className="total-todos">{project.numOfTodos}</div>
				)}
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<RenameProject project={project} setShowModal={setShowModal} />
			</Modal>
		</div>
	);
}
