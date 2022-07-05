import { useState } from "react";
import ProjectForm from "../ProjectForm/ProjectForm";

export default function RenameProject({ project, setShowModal }) {
	const [newProjectName, setNewProjectName] = useState(project.name);

	const handleSubmit = (e) => {};

	return (
		<div className="RenameProject">
			<ProjectForm
				handleSubmit={handleSubmit}
				heading="Edit project name!"
				value={newProjectName}
				setValue={setNewProjectName}
				setShowModal={setShowModal}
				confirmButtonText="Confirm"
			/>
		</div>
	);
}
