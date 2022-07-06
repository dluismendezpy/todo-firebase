import { createContext, useState } from "react";
import { useFilterTodos, useTodos } from "./TodoActionsHelper";
import { useProjects, useProjectsWithStats } from "./ProjectActionsHelper";
import { DEFAULT_PROJECT_DAY } from "../globalValues";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
	const defaultProject = DEFAULT_PROJECT_DAY;
	const [selectedProject, setSelectedProject] = useState(defaultProject);
	const [selectedTodo, setSelectedTodo] = useState(undefined);
	const todos = useTodos();
	const projects = useProjects();
	const projectsWithStats = useProjectsWithStats(projects, todos);
	const filteredTodo = useFilterTodos(todos, selectedProject);

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
