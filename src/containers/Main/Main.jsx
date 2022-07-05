import Todos from "../Todos/Todos";
import EditTodo from "../../components/EditTodo/EditTodo";
import "./Main.css";

export default function Main() {
	return (
		<div className="main">
			<Todos />
			<EditTodo />
		</div>
	);
}
