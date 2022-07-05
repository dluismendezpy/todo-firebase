import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./AddNewTodo.css";
import TodoForm from "../TodoForm/TodoForm";
import { TodoContext } from "../../helpers/TodoContext";
import { collection, addDoc } from "firebase/firestore";
import {
	CALENDAR_ITEMS,
	FIREBASE_TODOS_COLLECTION_NAME,
} from "../../globalValues";
import { db } from "../../helpers/firebase";
import moment from "moment";
import randomcolor from "randomcolor";

export default function AddNewTodo() {
	const { projects, selectedProject } = useContext(TodoContext);

	const [showModal, setShowModal] = useState(false);
	const [text, setText] = useState("");
	const [day, setDay] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [todoProject, setTodoProject] = useState(selectedProject);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (text && !CALENDAR_ITEMS.includes(todoProject)) {
			try {
				const docRef = await addDoc(
					collection(db, FIREBASE_TODOS_COLLECTION_NAME),
					{
						text: text,
						date: moment(day).format("MM/DD/YYYY"),
						day: moment(day).format("d"),
						time: moment(time).format("hh:mm A"),
						checked: false,
						color: randomcolor(),
						projectName: todoProject,
					},
				);
				setShowModal(false);
				setText("");
				setDay(new Date());
				setTime(new Date());
				console.log(`Document written with ID: ${docRef.id}`);
			} catch (e) {
				console.error(`Error adding document: ${e}`);
			}
		}
	};

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
