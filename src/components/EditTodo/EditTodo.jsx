import { useContext, useState, useEffect } from "react";
import TodoForm from "../TodoForm/TodoForm";
import "./EditTodo.css";
import { TodoContext } from "../../helpers/TodoContext";
import moment from "moment";
import { updateTodo } from "../../helpers/TodoActionsHelper";

export default function EditTodo() {
	// context
	const { selectedTodo, projects } = useContext(TodoContext);

	// state
	const [text, setText] = useState("");
	const [day, setDay] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [todoProject, setTodoProject] = useState("");

	useEffect(() => {
		if (selectedTodo) {
			setText(selectedTodo.text);
			setDay(moment(selectedTodo.date, "MM/DD/YYYY"));
			setTime(moment(selectedTodo.time, "hh:mm A"));
			setTodoProject(selectedTodo.projectName);
		}
	}, [selectedTodo]);

	useEffect(() => {
		updateTodo(selectedTodo, todoProject, text, day, time);
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
