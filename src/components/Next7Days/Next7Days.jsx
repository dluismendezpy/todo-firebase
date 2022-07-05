import { useEffect, useState } from "react";
import moment from "moment";
import Todo from "../Todo/Todo";
import { DAYS } from "../../globalValues";
import "./Next7Days.css";

export default function Next7Days({ todos }) {
	const [weekTodos, setWeekTodos] = useState([]);

	useEffect(() => {
		const sortedTodosByDay = DAYS.map((day) => {
			return {
				todos: todos.filter((todo) => todo.day === day),
				number: day,
			};
		});

		const today = parseInt(moment().format("d"));

		const arrangeDays = sortedTodosByDay
			.slice(today)
			.concat(sortedTodosByDay.slice(0, today));

		setWeekTodos(arrangeDays);
	}, [todos]);

	return (
		<div className="next-7-days">
			{weekTodos.map((day) => (
				<div key={day.number}>
					<div className="day">
						<div className="name">
							{moment(day.number, "d").format("dddd")}
							{day.number === moment().format("d") && " (Today)"}
						</div>
						<div className="total-todos">({day.todos.length})</div>
					</div>
					<div className="todos">
						{day.todos.map((todo) => (
							<Todo key={todo.id} todo={todo} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
