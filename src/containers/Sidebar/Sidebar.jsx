import AppBar from "../../components/AppBar/AppBar";
import AddNewTodo from "../../components/AddNewTodo/AddNewTodo";
import Calendar from "../../components/Calendar/Calendar";
import Projects from "../Projects/Projects";
import "./Sidebar.css";
import { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../../helpers/TodoContext";
import Footer from "../../components/Footer/Footer";

export default function Sidebar() {
	// context
	const { setSelectedTodo } = useContext(TodoContext);

	// ref
	const sidebarRef = useRef();

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	});

	const handleClick = (e) => {
		if (
			e.target === sidebarRef.current ||
			sidebarRef.current.contains(e.target)
		) {
			setSelectedTodo(undefined);
		}
	};

	return (
		<div className="Sidebar" ref={sidebarRef}>
			<AppBar />
			<AddNewTodo />
			<Calendar />
			<Projects />
			<Footer />
		</div>
	);
}
