import Todo from "../../components/Todo/Todo";
import Next7Days from "../../components/Next7Days/Next7Days";
import "./Todos.css";
import { useContext } from "react";
import { TodoContext } from "../../helpers/TodoContext";

export default function Todos() {
	const { todos, selectedProject } = useContext(TodoContext);

	return (
		<div className="Todos">
			<div className="selected-project">{selectedProject}</div>
			<div className="todos">
				{selectedProject === "next 7 days" ? (
					<Next7Days todos={todos} />
				) : (
					todos.map((todo) => <Todo todo={todo} key={todo.id} />)
				)}
			</div>
		</div>
	);
}
