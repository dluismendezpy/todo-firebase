import { useContext, useState, useEffect } from "react";
import TodoForm from "../TodoForm/TodoForm";
import "./EditTodo.css";
import { TodoContext } from "../../helpers/TodoContext";
import { FIREBASE_TODOS_COLLECTION_NAME } from "../../globalValues";
import moment from "moment";
import { db } from "../../helpers/firebase";

export default function EditTodo() {
	const [text, setText] = useState("");
	const [day, setDay] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [todoProject, setTodoProject] = useState("");

	const { selectedTodo, projects } = useContext(TodoContext);

	useEffect(() => {
		if (selectedTodo) {
			setText(selectedTodo.text);
			setDay(moment(selectedTodo.date, "MM/DD/YYYY"));
			setTime(moment(selectedTodo.time, "hh:mm A"));
			setTodoProject(selectedTodo.projectName);
		}
	}, [selectedTodo]);

	useEffect(() => {
		if (selectedTodo) {
			db.collection(FIREBASE_TODOS_COLLECTION_NAME)
				.doc(selectedTodo.id)
				.update({
					text: text,
					date: moment(day).format("MM/DD/YYYY"),
					day: moment(day).format("d"),
					time: moment(time).format("hh:mm A"),
					projectName: todoProject,
				})
				.then((r) => console.log(r));
		}
	}, [text, day, time, todoProject]);

	const handleSubmit = (e) => {};

	return (
		<div>
			{selectedTodo && (
				<div className="edit-todo">
					<div className="header">Edit Todo</div>
					<div className="container">
						<TodoForm
							handleSubmit={handleSubmit}
							text={text}
							setText={setText}
							day={day}
							setDay={setDay}
							time={time}
							setTime={setTime}
							todoProject={todoProject}
							setTodoProject={setTodoProject}
							projects={projects}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
