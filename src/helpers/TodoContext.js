import React, { createContext, useState } from "react";
import { useFilterTodos, useProjects, useTodos } from "./hooks";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
	const defaultProject = "today";
	const [selectedProject, setSelectedProject] = useState(defaultProject);
	const todos = useTodos();
	const projects = useProjects(todos);
	const filteredTodo = useFilterTodos(todos, selectedProject);

	return (
		<TodoContext.Provider
			value={{
				defaultProject: defaultProject,
				selectedProject: selectedProject,
				setSelectedProject: setSelectedProject,
				todos: filteredTodo,
				projects: projects,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export { TodoContextProvider, TodoContext };
