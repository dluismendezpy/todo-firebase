import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ProjectForm from "../ProjectForm/ProjectForm";
import "./AddNewProject.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { FIREBASE_PROJECTS_COLLECTION_NAME } from "../../globalValues";

export default function AddNewProject() {
	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// TODO: check if project already exist
		if (projectName) {
			try {
				const docRef = await addDoc(
					collection(db, FIREBASE_PROJECTS_COLLECTION_NAME),
					{
						name: projectName,
					},
				);
				setShowModal(false);
				setProjectName("");
				console.log(`Document written with ID: ${docRef.id}`);
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
