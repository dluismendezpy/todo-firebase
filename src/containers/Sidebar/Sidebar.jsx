import User from "../../components/User/User";
import AddNewTodo from "../../components/AddNewTodo/AddNewTodo";
import Calendar from "../../components/Calendar/Calendar";
import Projects from "../Projects/Projects";
import "./Sidebar.css";

export default function Sidebar() {
	return (
		<div className="Sidebar">
			<User />
			<AddNewTodo />
			<Calendar />
			<Projects />
		</div>
	);
}
