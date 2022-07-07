import { createContext, useState } from "react";
import { todoFilter, getTodos } from "./TodoActionsHelper";
import { getProjects, getProjectsWithStats } from "./ProjectActionsHelper";
import { DEFAULT_PROJECT_DAY } from "../globalValues";

const TodoContext = createContext(undefined);

const TodoContextProvider = ({ children }) => {
	const defaultProject = DEFAULT_PROJECT_DAY;

	// state
	const [selectedProject, setSelectedProject] = useState(defaultProject);
	const [selectedTodo, setSelectedTodo] = useState(undefined);

	const todos = getTodos();
	const projects = getProjects();
	const projectsWithStats = getProjectsWithStats(projects, todos);
	const filteredTodo = todoFilter(todos, selectedProject);

	return (
		<TodoContext.Provider
			value={{
				defaultProject: defaultProject,
				selectedProject: selectedProject,
				setSelectedProject: setSelectedProject,
				todos: filteredTodo,
				projects: projectsWithStats,
				selectedTodo: selectedTodo,
				setSelectedTodo: setSelectedTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export { TodoContextProvider, TodoContext };
