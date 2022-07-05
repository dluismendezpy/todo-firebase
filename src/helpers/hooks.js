import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import {
	FIREBASE_PROJECTS_COLLECTION_NAME,
	FIREBASE_TODOS_COLLECTION_NAME,
} from "../globalValues";
import moment from "moment";

export const useTodos = () => {
	const [todos, setTodos] = useState([]);

	const getTodos = async (e) => {
		try {
			const querySnapshot = await getDocs(
				collection(db, FIREBASE_TODOS_COLLECTION_NAME),
			);
			setTodos(
				querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
			);
		} catch (e) {
			console.error(`Error fetching document: ${e}`);
		}
	};

	useEffect(() => {
		getTodos().then((r) => console.log(r)); // get todos from firebase
	}, []);

	return todos;
};

export const useProjects = (todos) => {
	const [projects, setProjects] = useState([]);

	const calculateNumOfTodos = (projectName, todos) => {
		return todos.filter((todo) => todo.projectName === projectName).length;
	};

	const getProjects = async (e) => {
		try {
			const querySnapshot = await getDocs(
				collection(db, FIREBASE_PROJECTS_COLLECTION_NAME),
			);
			setProjects(
				querySnapshot.docs.map((doc) => {
					const projectName = doc.data().name;

					return {
						id: doc.id,
						name: projectName,
						numOfTodos: calculateNumOfTodos(projectName, todos),
					};
				}),
			);
		} catch (e) {
			console.error(`Error fetching document: ${e}`);
		}
	};

	useEffect(() => {
		getProjects().then((r) => console.log(r)); // get projects from firebase
	}, []);

	return projects;
};

export const deleteTodo = async ({ id }) => {
	try {
		const todo = await doc(db, FIREBASE_TODOS_COLLECTION_NAME, id);
		await deleteDoc(todo);
	} catch (e) {
		console.error(`Error deleting document: ${e}`);
	}
};

export const deleteProject = async ({ id, name }) => {
	try {
		const project = await doc(db, FIREBASE_PROJECTS_COLLECTION_NAME, id);
		await deleteDoc(project);
	} catch (e) {
		console.error(`Error deleting document: ${e}`);
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
