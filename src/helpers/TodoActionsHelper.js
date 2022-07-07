import { db } from "./firebase";
import { FIREBASE_TODOS_COLLECTION_NAME } from "../globalValues";
import moment from "moment";
import { useState, useEffect } from "react";

const getTodos = () => {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async (e) => {
		try {
			const todoList = db
				.collection(FIREBASE_TODOS_COLLECTION_NAME)
				.onSnapshot((snapshot) => {
					const data = snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							...doc.data(),
						};
					});
					setTodos(data);
				});

			return () => todoList();
		} catch (e) {
			console.error(`Error fetching todos: ${e}`);
		}
	};

	useEffect(() => {
		fetchTodos().then((r) => console.log(r)); // get todos from firebase
	}, []);

	return todos;
};

const deleteTodo = async ({ id }) => {
	try {
		await db.collection(FIREBASE_TODOS_COLLECTION_NAME).doc(id).delete();
	} catch (e) {
		console.error(`Error deleting todo: ${e}`);
	}
};

const checkTodo = async ({ id, checked }) => {
	// mark todo as completed
	try {
		await db.collection(FIREBASE_TODOS_COLLECTION_NAME).doc(id).update({
			checked: !checked,
		});
	} catch (e) {
		console.error(`Error check todo: ${e}`);
	}
};

const todoFilter = (todos, selectedProject) => {
	// state
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		let data;
		const currentDate = moment().format("MM/DD/YYYY");

		if (selectedProject === "today") {
			data = todos.filter((todo) => todo.date === currentDate);
		} else if (selectedProject === "next 7 days") {
			data = todos.filter((todo) => {
				const todoDate = moment(todo.date, "MM/DD/YYYY");
				const todayDate = moment(currentDate, "MM/DD/YYYY");

				const diffDays = todoDate.diff(todayDate, "days");
				return diffDays >= 0 && diffDays < 7;
			});
		} else if (selectedProject === "all days") {
			data = todos;
		} else {
			data = todos.filter((todo) => todo.projectName === selectedProject);
		}

		setFilteredTodos(data);
	}, [todos, selectedProject]);

	// get all filtered todos
	return filteredTodos;
};

const repeatNextDay = async (todo) => {
	const AMOUNT = 1;
	const nextDay = moment(todo.date, "MM/DD/YYYY").add(AMOUNT, "days");

	const repeatedTodo = {
		...todo,
		checked: false,
		date: nextDay.format("MM/DD/YYYY"),
		day: nextDay.format("d"),
	};

	delete repeatedTodo.id;

	// repeat todo at next day
	await db.collection("todos").add(repeatedTodo);
};

const updateTodo = (selectedTodo, todoProject, text, day, time) => {
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
};

export {
	getTodos,
	deleteTodo,
	checkTodo,
	todoFilter,
	repeatNextDay,
	updateTodo,
};
