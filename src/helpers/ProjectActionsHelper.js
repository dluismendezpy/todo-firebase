import { useState, useEffect } from "react";
import { db } from "./firebase";
import { FIREBASE_PROJECTS_COLLECTION_NAME } from "../globalValues";

export const useProjects = (todos) => {
	const [projects, setProjects] = useState([]);

	const getProjects = async (e) => {
		try {
			const unsubscribe = db
				.collection(FIREBASE_PROJECTS_COLLECTION_NAME)
				.onSnapshot((snapshot) => {
					const data = snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							name: doc.data().name,
						};
					});
					setProjects(data);
				});

			return () => unsubscribe();
		} catch (e) {
			console.error(`Error fetching document: ${e}`);
		}
	};

	useEffect(() => {
		getProjects().then((r) => console.log(r)); // get projects from firebase
	}, []);

	return projects;
};

export const useProjectsWithStats = (projects, todos) => {
	const [projectsWithStats, setProjectsWithStats] = useState([]);

	useEffect(() => {
		const data = projects.map((project) => {
			return {
				numOfTodos: todos.filter(
					(todo) => todo.projectName === project.name && !todo.checked,
				).length,
				...project,
			};
		});

		setProjectsWithStats(data);
	}, [projects, todos]);

	return projectsWithStats;
};
