import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./AddNewTodo.css";
import TodoForm from "../TodoForm/TodoForm";
import { TodoContext } from "../../helpers/TodoContext";

export default function AddNewTodo() {
	const { selectedProject } = useContext(TodoContext);

	const [showModal, setShowModal] = useState(false);
	const [text, setText] = useState("");
	const [day, setDay] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [todoProject, setTodoProject] = useState(selectedProject);

	const handleSubmit = (e) => {};

	const projects = [
		{ id: 1, name: "personal", numOfTodos: 0 },
		{ id: 2, name: "work", numOfTodos: 1 },
		{ id: 3, name: "other", numOfTodos: 2 },
	];

	useEffect(() => {
		setTodoProject(selectedProject);
	}, [selectedProject]);

	return (
		<div className="add-new-todo">
			<div className="btn">
				<button onClick={() => setShowModal(true)}>+ New Todo</button>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<TodoForm
					handleSubmit={handleSubmit}
					heading="Add new to do!"
					text={text}
					setText={setText}
					day={day}
					setDay={setDay}
					time={time}
					setTime={setTime}
					todoProject={todoProject}
					setTodoProject={setTodoProject}
					projects={projects}
					showButtons={true}
					setShowModal={setShowModal}
				/>
			</Modal>
		</div>
	);
}
