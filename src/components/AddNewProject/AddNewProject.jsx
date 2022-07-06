import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ProjectForm from "../ProjectForm/ProjectForm";
import "./AddNewProject.css";
import { FIREBASE_PROJECTS_COLLECTION_NAME } from "../../globalValues";
import firebase from "firebase/app";

export default function AddNewProject() {
	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (projectName) {
			try {
				const projectsRef = firebase
					.firestore()
					.collection(FIREBASE_PROJECTS_COLLECTION_NAME);

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
				console.error(`Error adding document: ${e}`);
			}
			setShowModal(false);
			setProjectName("");
		}
	};

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
