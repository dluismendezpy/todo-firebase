import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import {
	FIREBASE_PROJECTS_COLLECTION_NAME,
	FIREBASE_TODOS_COLLECTION_NAME,
} from "../globalValues";

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
