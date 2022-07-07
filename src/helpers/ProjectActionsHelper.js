import { useState, useEffect } from "react";
import { db } from "./firebase";
import { FIREBASE_PROJECTS_COLLECTION_NAME } from "../globalValues";

const getProjects = () => {
	// state
	const [projects, setProjects] = useState([]);

	const fetchProjects = async (e) => {
		try {
			const projectsList = db
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

			return () => projectsList();
		} catch (e) {
			console.error(`Error fetching projects: ${e}`);
		}
	};

	useEffect(() => {
		fetchProjects().then((r) => console.log(r));
	}, []);

	return projects;
};

const getProjectsWithStats = (projects, todos) => {
	// state
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

	// get projects with num of todos
	return projectsWithStats;
};

export { getProjects, getProjectsWithStats };
