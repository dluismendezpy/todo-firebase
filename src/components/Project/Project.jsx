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
import { useTransition, useSpring, animated } from "react-spring";

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

	const fadeIn = useSpring({
		from: { marginTop: "-12px", opacity: 0 },
		to: { marginTop: "0px", opacity: 1 },
	});

	const btnTransitions = useTransition(edit, {
		from: { opacity: 0, right: "-20px" },
		enter: { opacity: 1, right: "0px" },
		leave: { opacity: 0, right: "-20px" },
	});

	return (
		<animated.div className="project" style={fadeIn}>
			<div className="name" onClick={() => setSelectedProject(project.name)}>
				{project.name}
			</div>
			<div className="btns">
				{btnTransitions((props, editProject) =>
					editProject ? (
						<animated.div className="edit-delete" style={props}>
							<span className="edit" onClick={() => setShowModal(true)}>
								<EditOutlinedIcon size="13" />
							</span>
							<span className="delete" onClick={() => deleteProject(project)}>
								<DoDisturbOnOutlinedIcon />
							</span>
						</animated.div>
					) : project.numOfTodos === 0 ? (
						""
					) : (
						<animated.div className="total-todos" style={props}>
							{project.numOfTodos}
						</animated.div>
					),
				)}
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<RenameProject project={project} setShowModal={setShowModal} />
			</Modal>
		</animated.div>
	);
}
