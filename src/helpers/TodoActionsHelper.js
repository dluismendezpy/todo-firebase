import { db } from "./firebase";
import { FIREBASE_TODOS_COLLECTION_NAME } from "../globalValues";
import moment from "moment";
import { useState, useEffect } from "react";

export const useTodos = () => {
	const [todos, setTodos] = useState([]);

	const getTodos = async (e) => {
		try {
			const unsubscribe = db
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

			return () => unsubscribe();
		} catch (e) {
			console.error(`Error fetching document: ${e}`);
		}
	};

	useEffect(() => {
		getTodos().then((r) => console.log(r)); // get todos from firebase
	}, []);

	return todos;
};

export const deleteTodo = async ({ id }) => {
	try {
		await db.collection(FIREBASE_TODOS_COLLECTION_NAME).doc(id).delete();
	} catch (e) {
		console.error(`Error deleting document: ${e}`);
	}
};

export const checkTodo = async ({ id, checked }) => {
	try {
		await db.collection(FIREBASE_TODOS_COLLECTION_NAME).doc(id).update({
			checked: !checked,
		});
	} catch (e) {
		console.error(`Error switching document: ${e}`);
	}
};

export const useFilterTodos = (todos, selectedProject) => {
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		let data;
		const todayDateFormated = moment().format("MM/DD/YYYY");

		if (selectedProject === "today") {
			data = todos.filter((todo) => todo.date === todayDateFormated);
		} else if (selectedProject === "next 7 days") {
			data = todos.filter((todo) => {
				const todoDate = moment(todo.date, "MM/DD/YYYY");
				const todayDate = moment(todayDateFormated, "MM/DD/YYYY");

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

	return filteredTodos;
};

export const repeatNextDay = async (todo) => {
	const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

	const repeatedTodo = {
		...todo,
		checked: false,
		date: nextDayDate.format("MM/DD/YYYY"),
		day: nextDayDate.format("d"),
	};

	delete repeatedTodo.id;

	await db.collection("todos").add(repeatedTodo);
};
