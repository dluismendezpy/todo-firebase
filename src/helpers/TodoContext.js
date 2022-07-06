import { createContext, useState } from "react";
import { useFilterTodos, useTodos } from "./TodoActionsHelper";
import { useProjects, useProjectsWithStats } from "./ProjectActionsHelper";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
	const defaultProject = "today";
	const [selectedProject, setSelectedProject] = useState(defaultProject);
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
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export { TodoContextProvider, TodoContext };
