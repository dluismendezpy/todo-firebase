import { useContext, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Todo.css";
import {
	checkTodo,
	deleteTodo,
	repeatNextDay,
} from "../../helpers/TodoActionsHelper";
import { TodoContext } from "../../helpers/TodoContext";

export default function Todo({ todo }) {
	const [hover, setHover] = useState(false);
	const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

	const handleDelete = (todo) => {
		deleteTodo(todo).then((r) => console.log(r));

		if (selectedTodo === todo) {
			setSelectedTodo(undefined);
		}
	};

	return (
		<div className="Todo">
			<div
				className="todo-container"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className="check-todo" onClick={() => checkTodo(todo)}>
					{todo.checked ? (
						<span className="checked">
							<CheckCircleOutlinedIcon color="#bebebe" />
						</span>
					) : (
						<span className="unchecked">
							<CircleOutlinedIcon color={todo.color} />
						</span>
					)}
				</div>
				<div className="text" onClick={() => setSelectedTodo(todo)}>
					<p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
						{todo.text}
					</p>
					<span>
						{todo.time} - {todo.projectName}
					</span>
					<div className={`line ${todo.checked ? "line-through" : ""}`}></div>
				</div>
				<div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
					{todo.checked && (
						<span>
							<ChangeCircleOutlinedIcon />
						</span>
					)}
				</div>
				<div className="delete-todo" onClick={() => handleDelete(todo)}>
					{(hover || todo.checked) && (
						<span>
							<DeleteOutlinedIcon />
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
