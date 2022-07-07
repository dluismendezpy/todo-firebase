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
import { useSpring, useTransition, animated } from "react-spring";

export default function Todo({ todo }) {
	// context
	const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

	// state
	const [hover, setHover] = useState(false);

	const handleDelete = (todo) => {
		deleteTodo(todo).then((r) => console.log(r));

		if (selectedTodo === todo) {
			setSelectedTodo(undefined);
		}
	};

	// spring animations
	const fadeIn = useSpring({
		from: { marginTop: "-12px", opacity: 0 },
		to: { marginTop: "0px", opacity: 1 },
	});

	const checkTransitions = useTransition(todo.checked, {
		from: { position: "absolute", transform: "scale(0)" },
		enter: { transform: "scale(1)" },
		leave: { transform: "scale(0)" },
	});

	return (
		<animated.div className="Todo" style={fadeIn}>
			<div
				className="todo-container"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className="check-todo" onClick={() => checkTodo(todo)}>
					{checkTransitions((props, checked) =>
						checked ? (
							<animated.span className="checked" style={props}>
								<CheckCircleOutlinedIcon style={{ color: "#bebebe" }} />
							</animated.span>
						) : (
							<animated.span className="unchecked" style={props}>
								<CircleOutlinedIcon style={{ color: todo.color }} />
							</animated.span>
						),
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
		</animated.div>
	);
}
