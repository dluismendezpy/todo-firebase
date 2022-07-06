import { useContext, useState } from "react";
import ProjectForm from "../ProjectForm/ProjectForm";
import { TodoContext } from "../../helpers/TodoContext";
import { db } from "../../helpers/firebase";
import {
	FIREBASE_PROJECTS_COLLECTION_NAME,
	FIREBASE_TODOS_COLLECTION_NAME,
} from "../../globalValues";

export default function RenameProject({ project, setShowModal }) {
	const [newProjectName, setNewProjectName] = useState(project.name);
	const { selectedProject, setSelectedProject } = useContext(TodoContext);

	const renameProject = (project, newProjectName) => {
		const projectsRef = db.collection(FIREBASE_PROJECTS_COLLECTION_NAME);
		const todosRef = db.collection(FIREBASE_TODOS_COLLECTION_NAME);

		const { name: oldProjectName } = project;

		projectsRef
			.where("name", "==", newProjectName)
			.get()
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					alert("Project with the same name already exists!");
				} else {
					projectsRef
						.doc(project.id)
						.update({
							name: newProjectName,
						})
						.then(() => {
							todosRef
								.where("projectName", "==", oldProjectName)
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										doc.ref.update({
											projectName: newProjectName,
										});
									});
								})
								.then(() => {
									if (selectedProject === oldProjectName) {
										setSelectedProject(newProjectName);
									}
								});
						});
				}
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		renameProject(project, newProjectName);
		setShowModal(false);
	};

	return (
		<div className="RenameProject">
			<ProjectForm
				handleSubmit={handleSubmit}
				heading="Edit list"
				value={newProjectName}
				setValue={setNewProjectName}
				setShowModal={setShowModal}
				confirmButtonText="Confirm"
			/>
		</div>
	);
}
