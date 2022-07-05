import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ProjectForm from "../ProjectForm/ProjectForm";
import "./AddNewProject.css";

export default function AddNewProject() {
	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");
	const handleSubmit = (e) => {};

	return (
		<div className="add-new-project">
			<div className="add-button">
				<span onClick={() => setShowModal(true)}>
					<AddOutlinedIcon size="20" />
				</span>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<ProjectForm
					handleSubmit={handleSubmit}
					heading="New project!"
					value={projectName}
					setValue={setProjectName}
					setShowModal={setShowModal}
					confirmButtonText="+ Add Project"
				/>
			</Modal>
		</div>
	);
}
