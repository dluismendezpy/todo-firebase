import Todos from "../Todos/Todos";
import EditTodos from "../../components/EditTodos/EditTodos";
import "./Main.css";

export default function Main() {
	return (
		<div className="main">
			<Todos />
			<EditTodos />
		</div>
	);
}
