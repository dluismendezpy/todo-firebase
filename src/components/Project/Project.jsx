import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import "./Project.css";
import Modal from "../Modal/Modal";
import RenameProject from "../RenameProject/RenameProject";
import { useContext, useState } from "react";
import { TodoContext } from "../../helpers/TodoContext";
import firebase from "firebase/app";
import {
	FIREBASE_PROJECTS_COLLECTION_NAME,
	FIREBASE_TODOS_COLLECTION_NAME,
} from "../../globalValues";

export default function Project({ project, edit }) {
	const { setSelectedProject, selectedProject, defaultProject } =
		useContext(TodoContext);
	const [showModal, setShowModal] = useState(false);

	const deleteProject = async ({ id, name }) => {
		try {
			firebase
				.firestore()
				.collection(FIREBASE_PROJECTS_COLLECTION_NAME)
				.doc(id)
				.delete()
				.then(() => {
					firebase
						.firestore()
						.collection(FIREBASE_TODOS_COLLECTION_NAME)
						.where("projectName", "==", name)
						.get()
						.then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								doc.ref.delete();
							});
						});
				})
				.then(() => {
					if (selectedProject === name) {
						setSelectedProject(defaultProject);
					}
				});
		} catch (e) {
			console.error(`Error deleting document: ${e}`);
		}
	};

	return (
		<div className="project">
			<div className="name" onClick={() => setSelectedProject(project.name)}>
				{project.name}
			</div>
			<div className="btns">
				{edit ? (
					<div className="edit-delete">
						<span className="edit" onClick={() => setShowModal(true)}>
							<EditOutlinedIcon size="13" />
						</span>
						<span className="delete" onClick={() => deleteProject(project)}>
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
