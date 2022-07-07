import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ProjectForm from "../ProjectForm/ProjectForm";
import "./AddNewProject.css";
import { FIREBASE_PROJECTS_COLLECTION_NAME } from "../../globalValues";
import { db } from "../../helpers/firebase";

export default function AddNewProject() {
	// state
	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");

	const addProjectToFirebase = async (e) => {
		e.preventDefault();

		if (projectName) {
			try {
				const projectsRef = db.collection(FIREBASE_PROJECTS_COLLECTION_NAME);

				projectsRef
					.where("name", "==", projectName)
					.get()
					.then((querySnapshot) => {
						if (querySnapshot.empty) {
							projectsRef.add({
								name: projectName,
							});
						} else {
							alert("Project already exists!");
						}
					});

				setShowModal(false);
				setProjectName("");
			} catch (e) {
				console.error(`Error adding project: ${e}`);
			}

			setShowModal(false);
			setProjectName("");
		}
	};

	return (
		<div className="add-new-project">
			<div className="add-button">
				<span onClick={() => setShowModal(true)}>
					<AddOutlinedIcon />
				</span>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<ProjectForm
					handleSubmit={addProjectToFirebase}
					heading="New list"
					value={projectName}
					setValue={setProjectName}
					setShowModal={setShowModal}
					confirmButtonText="+ Add List"
				/>
			</Modal>
		</div>
	);
}
